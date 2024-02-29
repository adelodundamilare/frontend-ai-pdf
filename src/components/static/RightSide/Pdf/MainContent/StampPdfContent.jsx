import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authRequest } from "../../../../../config/baseUrl";
import Left from "../../../LeftSide/Left";
import BackIcon from "../../../../../assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";
import ProgressModal from "../../../../Progress";
import { Document, Page } from "react-pdf";
import DeviceIcon from "../../../../../assets/device.svg";
import DropBoxIcon from "../../../../../assets/dropbox.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import StampPdfMessage from "./DownloadPDF/StampPdfMessage";

const StampPdfContent = () => {
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [input, setInput] = useState("");
  const [mergeID, setMergeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const nav = useNavigate();
  const pdfFile = location.state.pdf[0];
  const handler = async (e) => {
    if (!input) {
      toast.error("Stamp text is required");
      return;
    }

    const formData = new FormData();
    formData.append("input_pdf", location.state.pdf[0]);
    formData.append("text", input);

    try {
      setIsLoading(true);
      const response = await authRequest.post(
        "/pdf/stamp_pdf_with_text/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileUrl = response.data.data.pdf;
      setFileUrl(fileUrl);

      setIsButtonClicked(true);
      toast.success("PDF stamped successfully");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
      console.error("Error stamping files:", error);
    }
  };

  if (isLoading) return <ProgressModal />;

  return (
    <>
      {isButtonClicked ? (
        <StampPdfMessage
          mergeID={mergeID}
          fileUrl={fileUrl}
          onClose={() => setIsButtonClicked(false)}
        />
      ) : (
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
                onClick={() => nav("/pdf/stamp")}
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

              <div className="flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="w-[15rem] rounded-[0.5rem] bg-gray-100">
                  <p className="text-sm m-4 bg-white p-3">
                    <Document
                      file={location.state.pdf[0]}
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
                  </p>
                  <span
                    style={{
                      display: "block",
                      textAlign: "center",
                      margin: "0 auto",
                    }}
                    className="font-bold"
                  >
                    {pdfFile.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-[13rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative">
              <div className="flex justify-center items-center flex-col">
                <p className="text-lg text-center pl-4 pr-4">Stamp Pdf </p>
              </div>

              <div className="w-[100%] pr-2 pl-2 mt-4">
                <p className="tex-[#474747] mb-2">Enter text:</p>
                <input
                  style={{ border: "1px solid black" }}
                  type="text"
                  onChange={(e) => setInput(e.target.value)}
                  name=""
                  placeholder="Enter Text"
                  className="w-[100%] h-[2.4rem] outline-none pl-3 pr-3 rounded-[0.375rem]"
                />
              </div>

              <div className=" absolute bottom-3 flex justify-center items-center">
                <button
                  onClick={handler}
                  className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md"
                >
                  Stamp Pdf
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
                    <p className="text-lg text-center pl-4 pr-4">Stamp Pdf</p>
                  </div>

                  <div className="w-[100%] pr-2 pl-2 mt-4">
                    <p className="tex-[#474747] mb-2">Enter text:</p>
                    <input
                      style={{ border: "1px solid black" }}
                      type="text"
                      name=""
                      placeholder="Enter Text"
                      className="w-[100%] h-[2.4rem] outline-none pl-3 pr-3 rounded-[0.375rem]"
                    />
                  </div>

                  <div className=" absolute bottom-3 flex justify-center items-center">
                    <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
                      Stamp Pdf
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
      )}
    </>
  );
};

export default StampPdfContent;
