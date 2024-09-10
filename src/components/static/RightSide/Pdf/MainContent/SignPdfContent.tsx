import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Konva from 'konva';
import { Stage, Layer, Image as KonvaImage, Line, Transformer } from "react-konva";

import { authRequest } from "../../../../../config/baseUrl";
import Left from "../../../LeftSide/Left";
import BackIcon from "../../../../../assets/back.svg";
import DeviceIcon from "../../../../../assets/device.svg";
import DropBoxIcon from "../../../../../assets/dropbox.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const SignPDF: React.FC = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const file = location.state.pdf[0];
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [signature, setSignature] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signaturePositions, setSignaturePositions] = useState<{
    [key: number]: { x: number; y: number; width: number; height: number; id: string };
  }>({});
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [pdfDimensions, setPdfDimensions] = useState({
    width: 0,
    height: 0,
    scale: 1,
  });
  const [signatureImage, setSignatureImage] = useState<HTMLImageElement | null>(
    null
  );
  const [selectedId, selectShape] = useState<string | null>(null);

  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    const updatePdfDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const scaleX = containerWidth / 595; // A4 width in points
        const scaleY = containerHeight / 842; // A4 height in points
        const scale = Math.min(scaleX, scaleY);
        setPdfDimensions({
          width: 595 * scale,
          height: 842 * scale,
          scale: scale,
        });
      }
    };

    updatePdfDimensions();
    window.addEventListener("resize", updatePdfDimensions);

    return () => window.removeEventListener("resize", updatePdfDimensions);
  }, []);

  useEffect(() => {
    if (selectedId && transformerRef.current) {
      const node = stageRef.current.findOne(`#${selectedId}`);
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleMouseDown = (e: any) => {
    if (showSignatureModal) {
      setIsDrawing(true);
      const pos = e.target.getStage().getPointerPosition();
      setSignature([...signature, { points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: any) => {
    if (showSignatureModal && isDrawing) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      const lastLine = signature[signature.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setSignature([...signature]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || Object.keys(signaturePositions).length === 0) {
      setMessage("Please select a file and place signatures on all pages");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("pdf_file", file);

    // Convert signatures to images and add to formData
    Object.entries(signaturePositions).forEach(([page, position]) => {
      const pageNumber = parseInt(page);
      const signatureStage = new Konva.Stage({
        container: document.createElement('div'), // Konva needs a container
        width: position.width,
        height: position.height,
      });
      const layer = new Konva.Layer();
      const image = new Konva.Image({
        image: signatureImage as CanvasImageSource ,
        width: position.width,
        height: position.height,
      });
      layer.add(image);
      signatureStage.add(layer);

      const dataUrl = signatureStage.toDataURL();
      formData.append(
        `signature_data_${pageNumber}`,
        JSON.stringify({
          image: dataUrl,
          x: position.x / pdfDimensions.scale,
          y: (pdfDimensions.height - position.y - position.height) / pdfDimensions.scale, // Adjust Y coordinate
          width: position.width / pdfDimensions.scale,
          height: position.height / pdfDimensions.scale,
        })
      );
    });

    try {
      const response = await authRequest.post("/pdf/sign_pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      // Create a link element, use it to download the blob, then remove it
      const fileURL = URL.createObjectURL(file);
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.download = "signed_document.pdf";
      document.body.appendChild(fileLink);
      fileLink.click();
      document.body.removeChild(fileLink);

      setMessage("PDF signed and downloaded successfully");
    } catch (error) {
      console.error("Error signing PDF:", error);
      setMessage("An error occurred while signing the PDF");
    } finally {
      setLoading(false);
    }
  };

  const finishSignature = () => {
    if (stageRef.current) {
      const dataUrl = stageRef.current.toDataURL();
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        setSignatureImage(img);
        setShowSignatureModal(false);
        const newId = `signature-${Date.now()}`;
        setSignaturePositions((prev) => ({
          ...prev,
          [currentPage]: {
            x: 50,
            y: 50,
            width: img.width * 0.5,
            height: img.height * 0.5,
            id: newId
          },
        }));
        selectShape(newId);
      };
    }
  };

  const deleteSignature = () => {
    if (selectedId) {
      setSignaturePositions((prev) => {
        const newPositions = { ...prev };
        delete newPositions[currentPage];
        return newPositions;
      });
      selectShape(null);
    }
  };

  return (
    <div className="relative overflow-hidden h-screen">
      <div className="ml-3 md:hidden block pt-3">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setshowSideBar(!showSideBar)}
        />
      </div>

      <div className="flex justify-between h-full overflow-hidden font-roboto">
        <div className="flex-1 relative">
          <div
            className="flex gap-3 cursor-pointer p-3 h-fit"
            onClick={() => nav("/pdf/to/other")}
          >
            <img src={BackIcon} alt="" />
            <p>Back</p>
          </div>

          <div className="absolute right-2">
            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <AiOutlinePlus className=" text-white" />
            </div>
            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <FaCopy className=" text-white" />
            </div>
            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <img src={DeviceIcon} alt="" />
            </div>
            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <img src={DropBoxIcon} alt="" />
            </div>
          </div>

          <div
            ref={containerRef}
            className="absolute inset-0 mt-16 mb-16 overflow-auto flex justify-center items-center"
          >
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) =>
                console.error("Error loading document:", error)
              }
            >
              <Page
                pageNumber={currentPage}
                width={pdfDimensions.width}
                height={pdfDimensions.height}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
            {signatureImage && (
              <Stage
                width={pdfDimensions.width}
                height={pdfDimensions.height}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                ref={stageRef}
                onMouseDown={(e) => {
                  const clickedOnEmpty = e.target === e.target.getStage();
                  if (clickedOnEmpty) {
                    selectShape(null);
                  }
                }}
              >
                <Layer>
                  {Object.entries(signaturePositions).map(
                    ([page, position]) =>
                      parseInt(page) === currentPage && (
                        <KonvaImage
                          key={position.id}
                          id={position.id}
                          image={signatureImage}
                          x={position.x}
                          y={position.y}
                          width={position.width}
                          height={position.height}
                          draggable
                          onClick={() => selectShape(position.id)}
                          onTap={() => selectShape(position.id)}
                          onDragEnd={(e) => {
                            setSignaturePositions((prev) => ({
                              ...prev,
                              [currentPage]: {
                                ...prev[currentPage],
                                x: e.target.x(),
                                y: e.target.y(),
                              },
                            }));
                          }}
                          onTransformEnd={(e) => {
                            const node = e.target;
                            setSignaturePositions((prev) => ({
                              ...prev,
                              [currentPage]: {
                                ...prev[currentPage],
                                x: node.x(),
                                y: node.y(),
                                width: node.width() * node.scaleX(),
                                height: node.height() * node.scaleY(),
                              },
                            }));
                          }}
                        />
                      )
                  )}
                  {selectedId && (
                    <Transformer
                      ref={transformerRef}
                      boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                          return oldBox;
                        }
                        return newBox;
                      }}
                    />
                  )}
                </Layer>
              </Stage>
            )}
          </div>

          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-[#20808D] text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setShowSignatureModal(true)}
              className="bg-[#20808D] text-white px-4 py-2 rounded-md"
            >
              Sign PDF
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, numPages || 1))
              }
              disabled={currentPage === numPages}
              className="bg-[#20808D] text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#20808D] text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            {selectedId && (
              <button
                onClick={deleteSignature}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete Signature
              </button>
            )}
          </div>
        </div>
      </div>

      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Draw Your Signature</h3>
            <Stage
              width={400}
              height={200}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              ref={stageRef}
            >
              <Layer>
                {signature.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke="#000"
                    strokeWidth={2}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                  />
                ))}
              </Layer>
            </Stage>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSignature([])}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#20808D] text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-green-100 rounded-md">
          <p className="text-green-700">{message}</p>
        </div>
      )}
    </div>
  );
};

export default SignPDF;
