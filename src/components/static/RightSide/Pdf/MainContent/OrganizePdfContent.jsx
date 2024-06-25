import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Document, Page } from "react-pdf";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
//
import Left from "../../../LeftSide/Left";
import { authRequest } from "../../../../../config/baseUrl";
import BackIcon from "../../../../../assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import DeviceIcon from "../../../../../assets/device.svg";
import DropBoxIcon from "../../../../../assets/dropbox.svg";
import ProgressModal from "../../../../Progress";
import Message from "./DownloadPDF/Message";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 2,
  margin: `0 ${grid}px 0 0`,
  background: isDragging ? "lightgreen" : "#ccc",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  display: "flex",
  padding: grid,
  overflow: "auto",
});

const OrganizePdfContent = () => {
  const [numPages, setNumPages] = useState(0);
  const location = useLocation();
  const [pdfFile] = useState(location.state.pdf[0]);
  const [items, setItems] = useState([]);
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const nav = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(0);
  const [mergeID, setMergeId] = useState(null);
  const [pagesToExclude, setPagesToExclude] = useState([]);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const reorderedItems = Array.from(items);
      const [removed] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, removed);

      setItems(reorderedItems);
    },
    [items]
  );

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    const pdfItems = Array.from({ length: numPages }, (_, index) => ({
      id: `page-${index + 1}`,
      pageNumber: index + 1,
      content: `Page ${index + 1}`,
    }));
    setItems(pdfItems);
  };

  const removeItem = (item) => {
    setItems(items.filter((i) => i !== item));
    setPagesToExclude([...pagesToExclude, item.pageNumber]);
  };

  const handler = async (e) => {
    const formData = new FormData();
    formData.append("input_pdf", location.state.pdf[0]);
    formData.append(
      "user_order",
      items.map((item) => item.pageNumber)
    );
    formData.append("pages_to_exclude", pagesToExclude);

    try {
      setIsLoading(true);
      const response = await authRequest.post("/pdf/organize_pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const fileUrl = response.data.organized_data.organize_pdf;
      setFileUrl(fileUrl);

      setIsButtonClicked(true);
      toast.success("PDF organized successfully");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
      console.error("Error stamping files:", error);
    }
  };

  if (!pdfFile) return <p>no pdf selected</p>;

  if (isLoading) return <ProgressModal />;

  if (isButtonClicked) {
    return (
      <Message
        mergeID={mergeID}
        fileUrl={fileUrl}
        title="PDFs have been Organized!"
        onClose={() => setIsButtonClicked(false)}
      />
    );
  }

  return (
    <div className="relative">
      {/* HUMBURGER MENU  */}
      <div className="ml-3 md:hidden block pt-3">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setshowSideBar(!showSideBar)}
        />
      </div>

      <div className="flex justify-between h-[100vh] overflow-y-auto overflow-x-hidden font-roboto">
        <div className="flex-1 relative">
          <div
            className="flex gap-3 cursor-pointer p-3 h-fit"
            onClick={() => nav("/pdf/organize")}
          >
            <img src={BackIcon} alt="" />
            <p>Back</p>
          </div>

          {/* <div className="absolute right-2 z-10">
            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <AiOutlinePlus alt="" className=" text-white" />
            </div>

            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <FaCopy alt="" className=" text-white" />
            </div>

            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <img src={DeviceIcon} alt="" />
            </div>

            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <img src={DropBoxIcon} alt="" />
            </div>
          </div> */}
          {pdfFile && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    className="flex gap-2 relative z-0"
                  >
                    <Document
                      file={pdfFile}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-5">
                        {items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="relative"
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <Page
                                    pageNumber={item.pageNumber}
                                    // pageNumber={index + 1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    width={250}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeItem(item)}
                                    className="w-7 h-7 rounded-full bg-red-500 text-white absolute -right-[10px] -top-[10px]"
                                  >
                                    -
                                  </button>
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </Document>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>

        <div className="w-[13rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative">
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg text-center pl-4 pr-4">Organize Pdf</p>
          </div>

          <div className="w-[100%] pr-2 pl-2 mt-4">
            <p className="tex-[#474747] mb-2">Organize Mode:</p>
            <p>Drag and drop items to organize document</p>

            {/* <div className="flex justify-between gap-x-2 items-center">
              <div className="w-[50%]">
                <div
                  style={{ border: "1px solid black" }}
                  className="w-[100%] cursor-pointer h-[2.5rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1"
                >
                  <p className="text-xs">Top To Bottom</p>
                </div>
              </div>

              <div className="w-[50%]">
                <div
                  style={{ border: "1px solid black" }}
                  className="w-[100%] cursor-pointer h-[2.5rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1"
                >
                  <p className="text-xs">Bottom To Top</p>
                </div>
              </div>
            </div> */}
          </div>

          <div className=" absolute bottom-3 flex justify-center items-center">
            <button
              onClick={handler}
              className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md"
            >
              Organize
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
            <div className="w-[13rem] h-[100vh] bg-white md:hidden shadow-CardShadow absolute top-0 right-0 p-4 flex justify-start items-center flex-col">
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
                <p className="text-lg text-center pl-4 pr-4">Organize PDF</p>
              </div>

              <div className="w-[100%] pr-2 pl-2 mt-4">
                <p className="tex-[#474747] mb-2">Organize Mode:</p>

                <div className="flex justify-between gap-x-2 items-center">
                  <div className="w-[50%]">
                    <div
                      style={{ border: "1px solid black" }}
                      className="w-[100%] cursor-pointer h-[2.5rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1"
                    >
                      <p className="text-xs">Top To Bottom</p>
                    </div>
                  </div>

                  <div className="w-[50%]">
                    <div
                      style={{ border: "1px solid black" }}
                      className="w-[100%] cursor-pointer h-[2.5rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1"
                    >
                      <p className="text-xs">Bottom To Top</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" absolute bottom-3 flex justify-center items-center">
                <button
                  type="button"
                  className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md"
                >
                  Organize
                </button>
              </div>
            </div>
          )
        }
      </div>

      {showSideBar && (
        <div className="lg:hidden block absolute top-0 left-0">
          <Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
        </div>
      )}
    </div>
  );
};

export default OrganizePdfContent;
