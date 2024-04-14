import React from "react";
import Left from "@/components/static/LeftSide/Left";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex items-start w-screen h-screen">
      <div className="lg:block hidden">
        <Left />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
