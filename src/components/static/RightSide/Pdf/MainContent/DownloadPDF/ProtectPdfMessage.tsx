import React from "react";
import { FaArrowLeftLong, FaTrash } from "react-icons/fa6";
import StampIcon from "../../../../../../assets/stamp.svg";
import PTOIcon from "../../../../../../assets/pto.svg";
import OTPIcon from "../../../../../../assets/otp.svg";
import OCRIcon from "../../../../../../assets/ocr.svg";
import ProtectIcon from "../../../../../../assets/protect.svg";
import { toast } from "react-toastify";
import { authRequest } from "../../../../../../config/baseUrl";

const ProtectPdfMessage = ({ protectFileUrl, mergeID, onClose }: any) => {
  const extractFilenameFromUrl = (url: string) => {
    const urlObject = new URL(url);
    return urlObject.pathname.split("/").pop();
  };

  const backPdf = async () => {
    onClose();
  };

  const DeleteMergePdf = async () => {
    try {
      const response: any = await authRequest.delete(
        `/pdf/protect_pdf/delete/${mergeID}/`
      );

      if (response.status === 204 || response.status === 200) {
        toast.success("Protect PDF deleted successfully");
        // Add any additional logic you want to execute after successful deletion
      } else {
        toast.error("Error deleting protect PDF:", response.status);
      }
    } catch (error: any) {
      toast.error("Error deleting protect PDF:", error.message);
    }
  };

  function downloadProtectPdf(protectFileUrl: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" flex justify-center items-center flex-col font-roboto mt-10">
        <h1 className="text-[#303030] text-lg mb-3 text-center">
          PDFs have been Protected!
        </h1>
        <p className="text-[#474747] text-sm mb-3 text-center">
          Click on download button to download protected pdf or continue to work
          on the file with different tools displayed below.
        </p>
        <div className="flex items-center gap-4">
          <div className="w-[2rem] cursor-pointer h-[2rem] bg-[#303030] rounded-sm flex justify-center items-center shadow-CardShadow">
            <FaArrowLeftLong onClick={backPdf} className="text-white" />
          </div>
          <button
            className="bg-[#20808D] text-white p-2 rounded-md w-[13rem]"
            onClick={() => downloadProtectPdf(protectFileUrl)}
          >
            Download to device
          </button>
          <div className="w-[2rem] h-[2rem] bg-[#20808D] cursor-pointer rounded-sm flex justify-center items-center shadow-CardShadow">
            <FaTrash onClick={DeleteMergePdf} className="text-white" />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div
            style={{ border: "1px solid #D9D9D9" }}
            className="p-1 rounded-md"
          >
            <img src={StampIcon} alt="" />
          </div>

          <div
            style={{ border: "1px solid #D9D9D9" }}
            className="p-1 rounded-md"
          >
            <img src={PTOIcon} alt="" />
          </div>

          <div
            style={{ border: "1px solid #D9D9D9" }}
            className="p-1 rounded-md"
          >
            <img src={OTPIcon} alt="" />
          </div>

          <div
            style={{ border: "1px solid #D9D9D9" }}
            className="p-1 rounded-md"
          >
            <img src={OCRIcon} alt="" />
          </div>

          <div
            style={{ border: "1px solid #D9D9D9" }}
            className="p-1 rounded-md"
          >
            <img src={ProtectIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectPdfMessage;