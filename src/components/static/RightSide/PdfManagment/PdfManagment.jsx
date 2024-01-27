import React, { useState } from "react";
import Left from "../../LeftSide/Left";
import { GiHamburgerMenu } from "react-icons/gi";
import { pdfTool } from "../../../../constants/pdfToolData";
import { useNavigate } from "react-router-dom";

const PdfManagment = () => {
  const [showSideBar, setshowSideBar] = useState(false);
  const nav = useNavigate();
  return (
    <div className="h-screen overflow-y-auto relative">
      <div className="w-[100%] h-[100%] overflow-y-auto font-roboto mt-4">
        {/* HAMBURGER MENU  */}
        <div className="ml-3 md:hidden block mt-3">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => setshowSideBar(!showSideBar)}
          />
        </div>

        {/* HEADING  */}
        <div className="flex justify-center items-center w-[100%] md:mt-0 mt-4">
          <div className="flex justify-center items-center w-[100%] flex-col">
            <h1 className="text-2xl mb-2 text-center ml-2 mr-2">
              All the PDF tools you require conveniently located in one spot
            </h1>
            <p className="md:w-[40%] w-[100%] text-center text-base text-[#303030] ml-2 mr-2">
              {" "}
              User-friendly PDF tools with ease. Merge, split, compress,
              convert, sign, unlock, and watermark PDFs in just a few clicks.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT  */}

        <div className="flex justify-center overflow-y-auto items-center h-[80%]">
          <div className="w-[100%] h-[95%] overflow-y-auto mt-10 justify-center flex items-center gap-x-3 flex-wrap">
            {pdfTool?.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ border: "1px solid #D9D9D9" }}
                  className="sm:w-[15rem] sm:h-[13rem] h-[10rem] cursor-pointer w-[100%] ml-2 mr-2 mb-3  rounded-md shadow-CardShadow p-3"
                  onClick={() =>
                    nav(`${item?.link ? item?.link : "/pdf/tool"}`)
                  }
                >
                  <img src={item?.icon} alt="" className="mb-2" />
                  <p className="text-lg mb-2">{item?.title}</p>
                  <p className="text-sm text-[#707078]">{item?.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RESPONSIVE SIDE BAR COMPONENT  */}
      {showSideBar && (
        <div className="lg:hidden block absolute top-0 left-0">
          <Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
        </div>
      )}
    </div>
  );
};

export default PdfManagment;
