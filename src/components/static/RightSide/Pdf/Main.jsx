import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Left from "../../LeftSide/Left";
import BackIcon from "../../../../assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";
import CopyIcon from "../../../../assets/copy.svg";
import DeviceIcon from "../../../../assets/device.svg";
import DropBoxIcon from "../../../../assets/dropbox.svg";
import { AiOutlineArrowDown } from "react-icons/ai";
import ArrowDownIcon from "../../../../assets/downarrow.svg";
import { authRequest } from "../../../../config/baseUrl";
import { toast } from "react-toastify";

const Main = ({ title, description, link }) => {
  const [showSideBar, setshowSideBar] = useState(false);
  const nav = useNavigate();
  const locat = useLocation();
  const location = useLocation().pathname.split("/")[3];

  const handleClick = async (event) => {
    let selectedFiles = event.target.files;
    // if (!selectedFiles.length) {
    //   toast.warn("Please select at least one file.");
    //   return;
    // }

    if (locat.pathname === "/pdf/merge" || locat.pathname === "/pdf/organize") {
      console.log('if')
      if (!selectedFiles.length >= 2) {
        toast.warn("Please select exactly two files.");
        return;
      }
      nav(link, { state: { pdf: Array.from(selectedFiles) } });
      return;
    }else if (locat.pathname === "/pdf/other/to/pdf") {
      nav(link, { state: { docx: Array.from(selectedFiles) } });
      // nav(link, { state: { docx: selectedFiles } });
    } else{
      nav(link, { state: { pdf: selectedFiles } });
    }


    // nav(link, { state: { pdf: selectedFiles } });


  }



  const renderFileSelectionButton = () => {
    if (locat.pathname === "/pdf/other/to/pdf") {
      return (
        <label
          htmlFor="fileInput"
          className="bg-[#20808D] text-white w-[12rem] h-[2.4rem] rounded-md flex items-center justify-center cursor-pointer"
        >
          Select Word file
        </label>
      );
    } else {
      return (
        <label
          htmlFor="fileInput"
          className="bg-[#20808D] text-white w-[12rem] h-[2.4rem] rounded-md flex items-center justify-center cursor-pointer"
        >
          Select file
        </label>
      );
    }
  };

  return (
    <>
      {/* HUMBURGER MENU  */}
      <div className="ml-3 md:hidden block mt-3">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setshowSideBar(!showSideBar)}
        />
      </div>

      {/* MAIN CONTENT  */}

      <div className="font-roboto">
        {/* BACK BUTTON  */}
        <div
          className="flex gap-2 items-center p-5 cursor-pointer mb-2"
          onClick={() => nav("/pdf/tool")}
        >
          <img src={BackIcon} alt="" />
          <p>Back</p>
        </div>

        {/* HEADING  */}

        <div className="flex justify-center items-center flex-col">
          <h1 className="text-xl text-center pl-3 pr-3 sm:pl-0 sm:pr-0">
            {title}
          </h1>
          <p className="text-[#47474F] pl-3 pr-3 sm:pl-0 sm:pr-0 mt-2 text-center">
            {description}
          </p>
        </div>

        {location === "other" && (
          <div className=" flex justify-center items-center mt-4">
            <div className="w-[98%] sm:w-[50%] shadow-ChatBoxShadown flex justify-between rounded-md">
              <div className="bg-[#20808D] p-3 rounded-tl-md rounded-bl-md">
                <p className="text-white">Choose Document Format</p>
              </div>

              <div className="flex-1 flex justify-between items-center ml-3 mr-3">
                <p className="text-[#47474F]">JPEG</p>
                <img src={ArrowDownIcon} className=" cursor-pointer" />
              </div>
            </div>
          </div>
        )}

        {/* MAIN PDF UPLOAD SECTION  */}

        <div className="flex justify-center items-center gap-3 mt-[2rem]">
          {/* UPLOAD PDF  */}
          <div className="w-[85%] sm:w-[50%] shadow-ChatBoxShadown h-[10rem] relative rounded-[0.25rem] p-3">
            <p className="text-center text-[#47474F]">Drag and drop file here</p>

            <p className="text-center mt-[1.5rem]">or</p>

            <div className="flex justify-center items-center">
              <input
                id="fileInput"
                type="file"
                className="hidden"
                multiple={
                  locat.pathname === "/pdf/merge" ||
                  locat.pathname === "/pdf/organize"
                    ? true
                    : false
                }
                onChange={handleClick}
              />

              {/* <label
                htmlFor="fileInput"
                className="bg-[#20808D] text-white w-[12rem] h-[2.4rem] rounded-md flex items-center justify-center cursor-pointer"
              >
                Select file
              </label> */}
               {renderFileSelectionButton()}
            </div>
          </div>

          {/* ICONS  */}
          <div>
            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <FaCopy src={CopyIcon} alt="" className=" text-white" />
            </div>
            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <img src={DeviceIcon} alt="" />
            </div>
            <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
              <img src={DropBoxIcon} alt="" />
            </div>
          </div>
        </div>
      </div>

      {showSideBar && (
        <div className="lg:hidden block absolute top-0 left-0">
          <Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
        </div>
      )}
    </>
  );
};

export default Main;
