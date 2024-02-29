import React, { useState } from "react";
import {toast} from 'react-toastify'
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
import { authRequest } from "../../../../../config/baseUrl";
import ProgressModal from "../../../../Progress";
import { extractFilenameFromUrl } from "../../../../../constants/helpers";
import CompressPdfMessage from "./DownloadPDF/CompressPdfMessage";

const CompressPdfContent = () => {
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("recommended");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [compressedFileUrl, setCompressedFileUrl] = useState(null);
  const [mergeID, setMergeId] = useState(null);
  const pdfFile = location.state.pdf[0]


  const compressHandler = async (e) => {
    const formData = new FormData();
    formData.append("input_pdf", location.state.pdf[0]);
    formData.append("compression_quality", selected);
    try {
      setIsLoading(true);
      const response = await authRequest.post("/pdf/compress_pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response, 'response')

      const newcompressFileUrl = response.data.split_pdf.compressed_file;
      setCompressedFileUrl(newcompressFileUrl);
      console.log(newcompressFileUrl, 'newcompressFileUrl')
      const newMergeId = response.data.split_pdf.id
      setMergeId(newMergeId)

      setIsButtonClicked(true)
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
      console.error("Error merging files:", error);
    }
  };

  if (isLoading) return <ProgressModal />;

  return (

    <>

    {isButtonClicked ? (
          <CompressPdfMessage
          mergeID ={mergeID}
          compressedFileUrl={compressedFileUrl}
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
            onClick={() => nav(-1)}
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

          <div className='flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <div className='w-[15rem] rounded-[0.5rem] bg-gray-100'>
            <p className='text-sm m-3 bg-white p-2'>
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
              <span style={{ display: 'block', textAlign: 'center', margin: '0 auto' }} className="font-bold">{pdfFile.name}</span>
            </div>
          </div>
        </div>

        <div className="w-[14rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative">
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg text-center pl-4 pr-4">Compress PDF</p>
            <div className="bg-[#D9D9D9] w-[13rem] h-[1px] mt-2 mb-2"></div>
          </div>

          <div className="">
            <div
              onClick={() => setSelected("extreme")}
              className={`cursor-pointer ${
                selected === "extreme" ? "shadow-lg transform scale-105" : ""
              }`}
            >
              <p className="text-[#20808D] pl-2 pr-2">Extreme Compression</p>
              <p className="mt-2 text-sm pl-2 pr-2">
                Less quality, high compression
              </p>
              <div className="bg-[#D9D9D9] w-[13rem] h-[1px] mt-2 mb-4"></div>
            </div>

            <div
              onClick={() => setSelected("recommended")}
              className={` cursor-pointer ${
                selected === "recommended"
                  ? "shadow-lg transform scale-105"
                  : ""
              }`}
            >
              <p className="text-[#20808D] pl-2 pr-2">
                Recommended Compression
              </p>
              <p className="mt-2 text-sm pl-2 pr-2">
                Good quality, good compression
              </p>
              <div className="bg-[#D9D9D9] w-[13rem] h-[1px] mt-2 mb-4"></div>
            </div>

            <div
              onClick={() => setSelected("less")}
              className={`cursor-pointer  ${
                selected === "less" ? "shadow-lg transform scale-105" : ""
              }`}
            >
              <p className="text-[#20808D] pl-2 pr-2">Less compression</p>
              <p className="mt-2 text-sm pl-2 pr-2">
                High quality, less compression
              </p>
              <div className="bg-[#D9D9D9] w-[13rem] h-[1px] mt-2 mb-2"></div>
            </div>
          </div>

          <div className=" absolute bottom-3 flex justify-center items-center">
            <button
              className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md"
              onClick={compressHandler}
            >
              Compress PDF
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
                <p className="text-lg text-center pl-4 pr-4">Compress PDF</p>
                <div className="bg-[#D9D9D9] w-[13rem] h-[1px] mt-2 mb-2"></div>
              </div>

              <div className="">
                <div>
                  <p className="text-[#20808D] pl-2 pr-2">
                    Extreme Compression
                  </p>
                  <p className="mt-2 text-sm pl-2 pr-2">
                    Less quality, high compression
                  </p>
                  <div className="bg-[#D9D9D9] w-[13rem] h-[1px] mt-2 mb-4"></div>
                </div>

                <div>
                  <p className="text-[#20808D] pl-2 pr-2">
                    Recommended Compression
                  </p>
                  <p className="mt-2 text-sm pl-2 pr-2">
                    Good quality, good compression
                  </p>
                  <div className="bg-[#D9D9D9] w-[13rem] h-[1px] mt-2 mb-4"></div>
                </div>

                <div>
                  <p className="text-[#20808D] pl-2 pr-2">Less compression</p>
                  <p className="mt-2 text-sm pl-2 pr-2">
                    High quality, less compression
                  </p>
                  <div className="bg-[#D9D9D9] w-[13rem] h-[1px] mt-2 mb-2"></div>
                </div>
              </div>

              <div className=" absolute bottom-3 flex justify-center items-center">
                <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
                  Compress PDF
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


export default CompressPdfContent;
