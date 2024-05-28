import { useState } from "react";
import Chat from "@/components/static/dashboard/Chat";
import PdfSummarizer from "@/components/static/dashboard/PdfSummarizer";
import DashboardLayout from "@/layouts/dashboard-layout";
import { EnumAiChat } from "@/lib/types";
import NoteSummarizer from "@/components/static/dashboard/NoteSummarizer";

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState(EnumAiChat.default);

  return (
    <DashboardLayout>
      <div className="flex justify-center pt-3 items-center">
        <div className="bg-[#D9D9D9] p-1 rounded-md">
          {/* <button onClick={() => setshowPopUp(!showPopUp)} className='sm:w-[8rem] w-[6rem] h-[2.5rem] bg-white rounded-md mr-4'>Default</button> */}
          <button
            onClick={() => setActiveTab(EnumAiChat.default)}
            className={`px-4 h-[2.5rem] ${
              activeTab === EnumAiChat.default ? "bg-white" : ""
            } rounded-md mr-4`}
          >
            Default
          </button>

          <button
            onClick={() => setActiveTab(EnumAiChat.summarizer)}
            className={`px-4 h-[2.5rem] ${
              activeTab === EnumAiChat.summarizer ? "bg-white" : ""
            } rounded-md`}
          >
            Summarizer
          </button>

          <button
            onClick={() => setActiveTab(EnumAiChat.note_summarizer)}
            className={`px-4 h-[2.5rem] ${
              activeTab === EnumAiChat.note_summarizer ? "bg-white" : ""
            } rounded-md`}
          >
            Note Summarizer
          </button>
        </div>
      </div>

      {activeTab === EnumAiChat.default && <Chat />}
      {activeTab === EnumAiChat.summarizer && <PdfSummarizer />}
      {activeTab === EnumAiChat.note_summarizer && <NoteSummarizer />}
    </DashboardLayout>
  );
};

export default DashboardScreen;
