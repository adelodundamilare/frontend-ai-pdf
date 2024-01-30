import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Left from "../../../LeftSide/Left";
import BackIcon from "../../../../../assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";
import DeviceIcon from "../../../../../assets/device.svg";
import DropBoxIcon from "../../../../../assets/dropbox.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { FaArrowLeftLong, FaTrash } from "react-icons/fa6";
import StampIcon from "../../../../../assets/stamp.svg";
import PTOIcon from "../../../../../assets/pto.svg";
import OTPIcon from "../../../../../assets/otp.svg";
import OCRIcon from "../../../../../assets/ocr.svg";
import ProtectIcon from "../../../../../assets/protect.svg";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { extractFilenameFromUrl } from "../../../../../constants/helpers";
import { toast } from "react-toastify";
import { authRequest } from "../../../../../config/baseUrl";
import Progress from "../../../../Progress";
import ProgressModal from "../../../../Progress";
import MergedPdfMessage from "./DownloadPDF/MergedPdfMessage";

const MergePdfContent = () => {
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const [lastStep, setlastStep] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [mergedFileUrl, setMergedFileUrl] = useState(null);

  console.log(isButtonClicked, 'isButtonClicked', mergedFileUrl)


  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  console.log(selectedFiles, 'selected_files')

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };


  const mergePdfHandler = async () => {
    const formData = new FormData();
    location.state.pdf.map((item, idx) => {
      formData.append("pdf_files", location.state.pdf[idx]);
    });

  // Append the newly selected files
  selectedFiles.forEach((selectedFile) => {
    formData.append("pdf_files", selectedFile);
  });

    try {
      setIsLoading(true);
      const response = await authRequest.post("/pdf/merge_pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const calculatedProgress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(calculatedProgress);
        },
      });
      const newMergedFileUrl = response.data.split_pdf.merged_file;
      setMergedFileUrl(newMergedFileUrl); 
      console.log(newMergedFileUrl, 'url')
      // const link = document.createElement("a");
      // link.href = mergedFileUrl;
      // link.setAttribute("download", extractFilenameFromUrl(mergedFileUrl));
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
      console.error("Error merging files:", error);
    }
  };



  if (isLoading) return <ProgressModal isLoading={isLoading} />;

  return (
    
    <>

{isButtonClicked ? (
      <MergedPdfMessage
        mergedFileUrl={mergedFileUrl}
        onClose={() => setIsButtonClicked(false)}
      />
    ) : (
      <div className="relative h-[100vh] overflow-y-auto">
        {/* HUMBURGER MENU  */}
        <div className="ml-3 md:hidden block pt-3">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => setshowSideBar(!showSideBar)}
          />
        </div>

        



        {!lastStep ? (
          <div className="flex justify-between h-[95%] overflow-y-auto overflow-x-hidden font-roboto">
            <div className="flex-1 relative">
              <div
                className="flex gap-3 cursor-pointer p-3 h-fit"
                onClick={() => nav(-1)}
              >
                <img src={BackIcon} alt="" />
                <p>Back</p>
              </div>

              <div className="absolute right-2">
             
              <label
                    htmlFor="fileInput"
                    className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer hover:bg-[#106e75] transition-colors"
                  >
                    <AiOutlinePlus alt="" className="text-white" />
                    <input
                      id="fileInput"
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf"
                      style={{ display: "none" }}
                      onChange={handleFileInputChange}
                    />
                    <div className="tooltip bg-[#106e75] text-white  font-bold p-1 rounded-md absolute right-[3rem] max-w-[20rem] whitespace-nowrap overflow-hidden overflow-ellipsis">
                    Add more files
                  </div>
                  </label>

                <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
                  <FaCopy alt="" className=" text-white" />
                </div>

                <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
                  <img src={DeviceIcon} alt="" />
                </div>

                <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
                  <img src={DropBoxIcon} alt="" />
                </div>
              </div>

              <div className="flex mt-10 justify-center flex-wrap overflow-scroll h-full items-center gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                {[...location.state.pdf, ...selectedFiles].map((file, index) => {
                  return (
                    <div className="sm:w-[13rem] w-[10rem] h-[15rem] rounded-[0.5rem]  overflow-y-auto bg-gray-100">
                      <div className="w-[200px] h-[200px">
                        <Document
                          file={file}
                          onLoadError={(error) =>
                            console.error("Error loading document:", error)
                          }
                        >
                          <Page
                            pageNumber={1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        </Document>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-[14rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative">
              <div className="flex justify-center items-center flex-col">
                <p className="text-lg text-center pl-4 pr-4">Merge PDF</p>
                <p className="text-[#47474F] text-sm mt-2 mb-2 pl-2 pr-2 text-center">
                  Please select more than 1 PDF file
                </p>
              </div>

              <div className=" absolute bottom-3 flex justify-center items-center">
              <button
                className={`w-[10rem] h-[2.5rem] rounded-md ${
                  [...location.state.pdf, ...selectedFiles].length < 2
                    ? 'bg-[#D3D3D3] text-[#666666] cursor-not-allowed' // Disabled styles
                    : 'bg-[#20808D] text-white hover:bg-[#106e75] transition-colors' // Enabled styles
                }`}
                onClick={() => {
                  mergePdfHandler();
                  setIsButtonClicked(true);
                }}
                
                disabled={[...location.state.pdf, ...selectedFiles].length < 2}
              >
                Merge PDF
              </button>
              
              </div>
            </div>

            {!showLeftSideBar && (
              <div
                className="md:hidden block p-3 absolute top-0 right-0"
                onClick={() => setshowLeftSideBar(true)}
              >
                <GiHamburgerMenu
                  className="text-2xl cursor-pointer"
                  onClick={() => setshowLeftSideBar(true)}
                />
              </div>
            )}

            {
              // reponsive side bar
              showLeftSideBar && (
                <div className="w-[14rem] h-[100vh] bg-white md:hidden shadow-CardShadow absolute top-0 right-0 p-4 flex justify-start items-center flex-col">
                  <div
                    className="w-[100%] mb-4 cursor-pointer"
                    onClick={() => setshowLeftSideBar(false)}
                  >
                    <ImCross
                      className="float-right"
                      onClick={() => setshowLeftSideBar(false)}
                    />
                  </div>

                  <div className="flex justify-center items-center flex-col">
                    <p className="text-lg text-center pl-4 pr-4">Merge PDF</p>
                    <p className="text-[#D9D9D9] mt-2 mb-2">
                      Please select more PDF file
                    </p>
                  </div>

                  <div className=" absolute bottom-3 flex justify-center items-center">
                    <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
                      Merge PDF
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        ) : (
          <div>
            <div
              className="flex gap-3 cursor-pointer p-3 h-fit"
              onClick={() => nav("/pdf/compress")}
            >
              <img src={BackIcon} alt="" />
              <p>Back</p>
            </div>
            <div className=" flex justify-center items-center flex-col font-roboto mt-10">
              <h1 className="text-[#303030] text-lg mb-3 text-center">
                PDFs have been merged!
              </h1>
              <p className="text-[#474747] text-sm mb-3 text-center">
                Click on download button to download merged pdf or continue to
                work on the file with different tools displayed below.
              </p>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setlastStep(false)}
                  className="w-[2rem] cursor-pointer h-[2rem] bg-[#303030] rounded-sm flex justify-center items-center shadow-CardShadow"
                >
                  <FaArrowLeftLong className="text-white" />
                </div>
                <button className="bg-[#20808D] text-white p-2 rounded-md w-[13rem]">
                  Download to device
                </button>
                <div className="w-[2rem] h-[2rem] bg-[#20808D] cursor-pointer rounded-sm flex justify-center items-center shadow-CardShadow">
                  <FaTrash className="text-white" />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div
                  style={{ border: "1px solid #D9D9D9" }}
                  className="p-1 rounded-md"
                >
                  <img src={StampIcon} alt="" />
                </div>

                <div
                  style={{ border: "1px solid #D9D9D9" }}
                  className="p-1 rounded-md"
                >
                  <img src={PTOIcon} alt="" />
                </div>

                <div
                  style={{ border: "1px solid #D9D9D9" }}
                  className="p-1 rounded-md"
                >
                  <img src={OTPIcon} alt="" />
                </div>

                <div
                  style={{ border: "1px solid #D9D9D9" }}
                  className="p-1 rounded-md"
                >
                  <img src={OCRIcon} alt="" />
                </div>

                <div
                  style={{ border: "1px solid #D9D9D9" }}
                  className="p-1 rounded-md"
                >
                  <img src={ProtectIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        )}

        {showSideBar && (
          <div className="lg:hidden block absolute top-0 left-0">
            <Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
          </div>
        )}
      </div>
      )}
    </>
  );
};

export default MergePdfContent;
