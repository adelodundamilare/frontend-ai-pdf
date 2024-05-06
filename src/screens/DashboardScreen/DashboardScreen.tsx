import Chat from "@/components/static/RightSide/Chat/Chat";
import PdfSummarizer from "@/components/static/RightSide/PdfSummarizer/PdfSummarizer";
import DashboardLayout from "@/layouts/dashboard-layout";
import { useState } from "react";

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState("default");
  return (
    <DashboardLayout>
      <div className="flex justify-center items-center">
        <div className="bg-[#D9D9D9] p-2 sm:w-[18rem] w-[14rem] rounded-md">
          {/* <button onClick={() => setshowPopUp(!showPopUp)} className='sm:w-[8rem] w-[6rem] h-[2.5rem] bg-white rounded-md mr-4'>Default</button> */}
          <button
            onClick={() => setActiveTab("default")}
            className={`sm:w-[8rem] w-[6rem] h-[2.5rem] ${
              activeTab === "default" ? "bg-white" : ""
            } rounded-md mr-4`}
          >
            Default
          </button>

          <button
            onClick={() => setActiveTab("summarizer")}
            className={`sm:w-[8rem] w-[6rem] h-[2.5rem] ${
              activeTab === "summarizer" ? "bg-white" : ""
            } rounded-md`}
          >
            Summarizer
          </button>
        </div>
      </div>
      {activeTab === "default" ? <Chat /> : <PdfSummarizer />}
    </DashboardLayout>
  );
};

export default DashboardScreen;
