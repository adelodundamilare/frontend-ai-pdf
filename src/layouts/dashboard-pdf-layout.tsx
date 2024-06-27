import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackIcon from "@/assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import ArrowDownIcon from "@/assets/downarrow.svg";
import Left from "@/components/static/LeftSide/Left";
import DashboardLayout from "./dashboard-layout";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}
const DashboardPdfLayout = ({ title, description, children }: Props) => {
  const [showSideBar, setshowSideBar] = useState(false);
  const nav = useNavigate();
  const location = useLocation().pathname.split("/")[3];

  return (
    <DashboardLayout>
      {/* HUMBURGER MENU  */}
      <div className="ml-3 md:hidden block mt-3">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setshowSideBar(!showSideBar)}
        />
      </div>

      {/* DashboardPdfLayout CONTENT  */}

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

        {/* {location === "other" && (
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
        )} */}

        {/* DashboardPdfLayout PDF UPLOAD SECTION  */}

        {children}
      </div>

      {showSideBar && (
        <div className="lg:hidden block absolute top-0 left-0">
          <Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPdfLayout;
