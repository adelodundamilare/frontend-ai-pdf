import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import DashboardLayout from "./dashboard-layout";

interface Props {
  children: React.ReactNode;
}
const DashboardBasicLayout = ({ children }: Props) => {
  const [showSideBar, setshowSideBar] = useState(false);
  const nav = useNavigate();

  return (
    <DashboardLayout>
      <div className="ml-3 md:hidden block mt-3">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setshowSideBar(!showSideBar)}
        />
      </div>

      <div className="font-roboto">
        <div
          className="flex gap-2 items-center p-5 cursor-pointer mb-2"
          onClick={() => nav("/search-case")}
        >
          <img src={BackIcon} alt="" />
          <p>Back</p>
        </div>

        {children}
      </div>
    </DashboardLayout>
  );
};

export default DashboardBasicLayout;
