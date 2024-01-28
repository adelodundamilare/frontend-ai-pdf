import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Left from "../../../LeftSide/Left";
import BackIcon from "../../../../../assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";
import CopyIcon from "../../../../../assets/copy.svg";
import DeviceIcon from "../../../../../assets/device.svg";
import DropBoxIcon from "../../../../../assets/dropbox.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { Document, Page } from "react-pdf";
import { authRequest } from "../../../../../config/baseUrl";
import ProgressModal from "../../../../Progress";
import { toast } from "react-toastify";
import { extractFilenameFromUrl } from "../../../../../constants/helpers";

const ProtectPdfContent = () => {
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!password || !confirmPassword)
      return toast.warn("Please enter password");
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      setError("");
      const formData = new FormData();
      formData.append("input_pdf", location.state.pdf[0]);
      formData.append("pdf_password", password);

      try {
        setModalIsOpen(true);
        const response = await authRequest.post("/pdf/protect_pdf/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const calculatedProgress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(calculatedProgress);
          },
        });

        const protectedFileUrl = response.data.split_pdf.protected_file;
        const link = document.createElement("a");
        link.href = protectedFileUrl;
        link.setAttribute("download", extractFilenameFromUrl(protectedFileUrl));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error protecting PDF");
        console.error("Error protecting PDF:", error);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <ProgressModal isLoading={isLoading} />;

  return (
    <>
      <div className="relative">
        {/* HUMBURGER MENU  */}
        <div className="ml-3 md:hidden block pt-3">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => setshowSideBar(!showSideBar)}
          />
        </div>

        <div className="flex justify-between h-[100vh] overflow-y-auto overflow-x-hidden font-roboto">
          <div className="flex-1 relative">
            <div
              className="flex gap-3 cursor-pointer p-3 h-fit"
              onClick={() => nav(-1)}
            >
              <img src={BackIcon} alt="" />
              <p>Back</p>
            </div>

            <div className="absolute right-2">
              <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
                <AiOutlinePlus alt="" className=" text-white" />
              </div>

              <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
                <FaCopy alt="" className=" text-white" />
              </div>

              <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
                <img src={DeviceIcon} alt="" />
              </div>

              <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer">
                <img src={DropBoxIcon} alt="" />
              </div>
            </div>

            <div className="flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="w-[15rem] rounded-[0.5rem] bg-gray-100">
                <Document
                  file={location.state.pdf[0]}
                  onLoadError={(error) =>
                    console.error("Error loading document:", error)
                  }
                >
                  <Page
                    pageNumber={1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
            </div>
          </div>

          <div className="w-[13rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col p-4 relative">
            <div className="flex justify-center items-center flex-col">
              <p className="text-lg text-center">Protect PDF</p>
              <p className="text-[#47474f] mt-2 text-sm text-center">
                Set a password to protect your PDF file
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <input
                  style={{ border: "1px solid rgba(48, 48, 48, 0.50)" }}
                  type="password"
                  placeholder="Password"
                  className="w-[100%] h-[2.3rem] rounded-md pl-3 pr-3 text-[#303030] outline-none"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <input
                  style={{ border: "1px solid rgba(48, 48, 48, 0.50)" }}
                  type="password"
                  placeholder="Re-enter password"
                  className="w-[100%] h-[2.3rem] rounded-md pl-3 pr-3 text-[#303030] outline-none mt-4"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
              <div className=" absolute bottom-3 flex justify-center items-center">
                <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
                  Protect Pdf
                </button>
              </div>
            </form>
          </div>

          {!showLeftSideBar && (
            <div
              className="md:hidden block p-3 absolute top-0 right-0"
              onClick={() => setshowLeftSideBar(true)}
            >
              <GiHamburgerMenu
                className="text-2xl cursor-pointer"
                onClick={() => setshowLeftSideBar(true)}
              />
            </div>
          )}

          {
            // reponsive side bar
            showLeftSideBar && (
              <div className="w-[13rem] h-[100vh] bg-white md:hidden shadow-CardShadow absolute top-0 right-0 p-4 flex justify-start items-center flex-col">
                <div
                  className="w-[100%] mb-4 cursor-pointer"
                  onClick={() => setshowLeftSideBar(false)}
                >
                  <ImCross
                    className="float-right"
                    onClick={() => setshowLeftSideBar(false)}
                  />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="text-lg text-center">Protect PDF</p>
                  <p className="text-[#47474f] mt-2 text-sm text-center">
                    Set a password to protect your PDF file
                  </p>
                </div>

                <div className="mt-5">
                  <input
                    style={{ border: "1px solid rgba(48, 48, 48, 0.50)" }}
                    type="text"
                    placeholder="password"
                    className="w-[100%] h-[2.3rem] rounded-md pl-3 pr-3 text-[#303030] outline-none"
                  />
                  <input
                    style={{ border: "1px solid rgba(48, 48, 48, 0.50)" }}
                    type="text"
                    placeholder="Re-enter password"
                    className="w-[100%] h-[2.3rem] rounded-md pl-3 pr-3 text-[#303030] outline-none mt-4"
                  />
                </div>

                <div className=" absolute bottom-3 flex justify-center items-center">
                  <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
                    Protect Pdf
                  </button>
                </div>
              </div>
            )
          }
        </div>

        {showSideBar && (
          <div className="lg:hidden block absolute top-0 left-0">
            <Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProtectPdfContent;
