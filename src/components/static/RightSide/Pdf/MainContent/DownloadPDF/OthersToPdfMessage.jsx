import React from 'react';
import { FaArrowLeftLong, FaTrash } from "react-icons/fa6";
import StampIcon from '../../../../../../assets/stamp.svg'
import PTOIcon from "../../../../../../assets/pto.svg";
import OTPIcon from "../../../../../../assets/otp.svg";
import OCRIcon from "../../../../../../assets/ocr.svg";
import ProtectIcon from "../../../../../../assets/protect.svg";
import { toast } from 'react-toastify';
import { authRequest } from '../../../../../../config/baseUrl';



const OthersToPdfMessage = ({ compressedFileUrl, mergeID, onClose }) => {
  const extractFilenameFromUrl = (url) => {
    const urlObject = new URL(url);
    return urlObject.pathname.split('/').pop();
  };

  const downloadCompressPdf = async () => {
    try {
      const response = await fetch(compressedFileUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", extractFilenameFromUrl(compressedFileUrl));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    //   onClose();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  const backPdf = async () => {
    onClose();
  }

  const DeleteMergePdf = async () => {
    try {
      const response = await authRequest.delete(`/pdf/word_to_pdf/delete/${mergeID}/`);

     
      if (response.status === 204) {
        toast.success('Pdf file deleted successfully');
        // Add any additional logic you want to execute after successful deletion
      } else {
        toast.error('Error deleting Pdf file:', response.status, response.statusText);
      }
    } catch (error) {
      toast.error('Error deleting Pdf file:', error.message);
    }
  };
  

  

  return (
    <div className="flex justify-center items-center h-screen">


    <div className=" flex justify-center items-center flex-col font-roboto mt-10">
                <h1 className="text-[#303030] text-lg mb-3 text-center">
                  Word File have been Converted to the PDF!
                </h1>
                <p className="text-[#474747] text-sm mb-3 text-center">
                  Click on download button to download Pdf file  or continue to
                  work on the file with different tools displayed below.
                </p>
                <div className="flex items-center gap-4">
                  <div
                    
                    className="w-[2rem] cursor-pointer h-[2rem] bg-[#303030] rounded-sm flex justify-center items-center shadow-CardShadow"
                  >
                    <FaArrowLeftLong onClick={backPdf} className="text-white" />
                  </div>
                  <button className="bg-[#20808D] text-white p-2 rounded-md w-[13rem]"  onClick={downloadCompressPdf}>
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

export default OthersToPdfMessage;

