import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Left from "../../../LeftSide/Left";
import BackIcon from "../../../../../assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";
import DeviceIcon from "../../../../../assets/device.svg";
import DropBoxIcon from "../../../../../assets/dropbox.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { Document, Page } from "react-pdf";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const OrganizePdfContent = () => {
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(0);
  const location = useLocation();
  const [dragableContent, setDragableContent] = useState([]);

  useEffect(() => {
    if (location.state && location.state.pdf) {
      const updatedContent = location.state.pdf.map((pdf, index) => ({
        id: (index + 1).toString(),
        ...pdf,
      }));
      setDragableContent(updatedContent);
    }
  }, [location.state]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(dragableContent);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDragableContent(items);
  }

  console.log(dragableContent, "kjkjk");

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

          <div className="absolute right-2">
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
          </div>

          <div className="flex justify-center mt-10 items-center absolute flex-wrap gap-2 h-full overflow-scroll top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="44ee" className="flex flex-row gap-2">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-row gap-2 flex-wrap"
                  >
                    {dragableContent?.map(({ id, name, thumb }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <div
                              className="sm:w-[13rem] w-[10rem] h-[15rem] rounded-[0.5rem]  bg-gray-100"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="w-[200px] h-[200px]">
                                <Document file={location.state.pdf[index]}>
                                  <Page
                                    pageNumber={1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                  />
                                </Document>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        <div className="w-[13rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative">
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg text-center pl-4 pr-4">Organize Pdf</p>
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
            <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
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
                <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
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
