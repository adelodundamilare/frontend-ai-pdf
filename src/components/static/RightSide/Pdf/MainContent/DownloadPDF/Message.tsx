import React from "react";
import { toast } from "react-toastify";
import { FaArrowLeftLong, FaTrash } from "react-icons/fa6";
//
import StampIcon from "../../../../../../assets/stamp.svg";
import PTOIcon from "../../../../../../assets/pto.svg";
import OTPIcon from "../../../../../../assets/otp.svg";
import OCRIcon from "../../../../../../assets/ocr.svg";
import ProtectIcon from "../../../../../../assets/protect.svg";
import { authRequest } from "../../../../../../config/baseUrl";

interface Props {
  fileUrl: string;
  title: string;
  mergeID: string;
  onClose: () => void;
}
const Message = ({ fileUrl, title, mergeID, onClose }: Props) => {
  const extractFilenameFromUrl = (url: any) => {
    const urlObject = new URL(url);
    return urlObject.pathname.split("/").pop();
  };

  const downloadCompressPdf = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", extractFilenameFromUrl(fileUrl) ?? "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //   onClose();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  const backPdf = () => {
    onClose();
  };

  const DeleteMergePdf = async () => {
    try {
      const response = await authRequest.delete(
        `/pdf/compress_pdf/delete/${mergeID}/`
      );

      if (response.status === 204 || response.status === 200) {
        toast.success("PDF deleted successfully");
      }
      toast.error("Error deleting PDF");
    } catch (error: any) {
      toast.error("Error deleting PDF:", error?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" flex justify-center items-center flex-col font-roboto mt-10">
        <h1 className="text-[#303030] text-lg mb-3 text-center">{title}</h1>
        <p className="text-[#474747] text-sm mb-3 text-center">
          Click on download button to download file or continue to work on the
          file with different tools displayed below.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={backPdf}
            className="w-[2rem] cursor-pointer h-[2rem] bg-[#303030] rounded-sm flex justify-center items-center shadow-CardShadow"
          >
            <FaArrowLeftLong className="text-white" />
          </button>
          <button
            className="bg-[#20808D] text-white p-2 rounded-md w-[13rem]"
            onClick={downloadCompressPdf}
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

export default Message;
