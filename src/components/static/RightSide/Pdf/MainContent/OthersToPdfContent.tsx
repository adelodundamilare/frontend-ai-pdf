import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
//
import Left from "../../../LeftSide/Left";
import BackIcon from "../../../../../assets/back.svg";
import DeviceIcon from "../../../../../assets/device.svg";
import DropBoxIcon from "../../../../../assets/dropbox.svg";
import DocsLogo from "../../../../../assets/docs.svg";
import ProgressModal from "../../../../Progress";
import { authRequest } from "../../../../../config/baseUrl";
import Message from "./DownloadPDF/Message";

const OthersToPdfContent = () => {
  const location = useLocation();
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [compressedFileUrl, setCompressedFileUrl] = useState(null);
  const [mergeID, setMergeId] = useState(null);

  const handler = async () => {
    setIsLoading(true);

    const formData = new FormData();
    location.state.docx.map((item: any, idx: any) => {
      formData.append("input_file", location.state.docx[idx]);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await authRequest.post("/pdf/word_to_pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });

      const data = response.data?.data;
      const newFileUrl = data?.pdf;
      setCompressedFileUrl(newFileUrl);
      // console.log(newcompressFileUrl, "newcompressFileUrl");
      // const newMergeId = response.data.conversion_data.id;
      setMergeId(data?.id);
      setIsButtonClicked(true);
      setIsLoading(false);
      toast.success("PDF conversion successful");
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error:", error);
      toast.error(error?.response?.data?.error || "Error occurred");
    }
  };

  if (isLoading) return <ProgressModal isLoading={isLoading} />;

  if (isButtonClicked) {
    return (
      <Message
        mergeID={mergeID ?? ""}
        title="File have been Converted to the PDF!"
        fileUrl={compressedFileUrl ?? ""}
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
            onClick={() => nav("/pdf/other/to/pdf")}
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

          <div className="flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="w-[15rem] rounded-[0.5rem] bg-gray-100">
              <p className="text-sm m-4 bg-white p-3">
                <div
                  style={{
                    height: "25vh",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <img src={DocsLogo} alt="Docs Logo" />
                </div>
                {/* <Document
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
                                </Document> */}
              </p>
            </div>
          </div>
        </div>

        <div className="w-[13rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative">
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg text-center pl-4 pr-4">Convert To PDF</p>
          </div>

          <div className=" absolute bottom-3 flex justify-center items-center">
            <button
              className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md"
              onClick={handler}
            >
              Convert
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
                <p className="text-lg text-center pl-4 pr-4">Convert to PDF</p>
              </div>

              <div className=" absolute bottom-3 flex justify-center items-center">
                <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
                  Convert
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

export default OthersToPdfContent;
