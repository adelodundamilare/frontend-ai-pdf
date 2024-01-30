import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Left from "../../../LeftSide/Left";
import BackIcon from "../../../../../assets/back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCopy } from "react-icons/fa";
import DeviceIcon from "../../../../../assets/device.svg";
import DropBoxIcon from "../../../../../assets/dropbox.svg";
import RangeIcon from "../../../../../assets/range.svg";
import PagesIcon from "../../../../../assets/pages.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { authRequest } from "../../../../../config/baseUrl";
import ProgressModal from "../../../../Progress";
import { extractFilenameFromUrl } from "../../../../../constants/helpers";
import { Document, Page } from "react-pdf";
import { Text } from '@react-pdf/renderer';
import { toast } from "react-toastify";
import SplitPdfMessage from "./DownloadPDF/SplitPdfMessage";

const SplitPdfContent = () => {
  const [showSideBar, setshowSideBar] = useState(false);
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [splitedFileUrl, setSplitedFileUrl] = useState(null);

  const [totalPages, setTotalPages] = useState(0); 
  const [numPage, setNumPages] = useState(0); 


  
  const [fromPage, setFromPage] = useState("1");
  const [toPage, setToPage] = useState("");

  console.log(fromPage, 'fromPage')



  const handleFromPageChange = (event) => {
    

    const newValue = event.target.value;

    // Check if the entered value is within the valid range
    if (newValue === '' || (newValue >= 1 && newValue <= numPage)) {
      setFromPage(newValue);
    } else {
      toast('Out of range. Please enter a valid page number.');

    }
  };

  const handleToPageChange = (event) => {
    const newValue = event.target.value;

    // Check if the entered value is within the valid range
    if (newValue === '' || (newValue >= 1 && newValue <= numPage)) {
      setToPage(newValue);
    } else {
      toast('Out of range. Please enter a valid page number.');

    }
  };

  const splitHandler = async () => {
    if (!fromPage || !toPage) return toast.warn("Please add range");
    const formData = new FormData();
    formData.append("input_pdf", location.state.pdf[0]);
    formData.append("start_page", fromPage);
    formData.append("end_page", toPage);

    try {
      setIsLoading(true);
      const response = await authRequest.post("/pdf/split_pdf/", formData, {
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

      console.log(response, 'response')
      const newSplitedFileUrl = response.data.split_pdf.split_pdf;
      console.log(newSplitedFileUrl, 'newSplitedFileUrl')

      setSplitedFileUrl(newSplitedFileUrl); 
      // const link = document.createElement("a");
      // link.href = mergedFileUrl;
      // link.setAttribute("download", extractFilenameFromUrl(mergedFileUrl));
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      setIsLoading(false);
      setIsButtonClicked(true);
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
      console.error("Error merging files:", error);
    }
  };

  const onLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    setNumPages(numPages)
  };
  console.log(totalPages, 'total')



  useEffect(() => {
    // Set toPage to the current value of numPage
    setToPage(String(numPage));
  }, [numPage]); // Trigger the effect whenever numPage changes

  if (isLoading) return <ProgressModal isLoading={isLoading} />;





  return (
    <>

  {isButtonClicked ? (
      <SplitPdfMessage
        splitedFileUrl={splitedFileUrl}
        onClose={() => setIsButtonClicked(false)}
      />
    ) : (
    <div className="relative h-[100vh] overflow-y-auto">
      {/* HUMBURGER MENU  */}
      <div className="ml-3 md:hidden block pt-3">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setshowSideBar(!showSideBar)}
        />
      </div>

      <div className="flex justify-between h-[95%] overflow-y-auto overflow-x-hidden font-roboto">
        <div className="flex-1 relative">
          <div
            className="flex gap-3 cursor-pointer p-3 h-fit"
            onClick={() => nav("/pdf/compress")}
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

          {/* <div className="flex mt-10 justify-center items-center gap-2 absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="sm:w-[13rem] w-[10rem] h-[15rem] rounded-[0.5rem] overflow-y-auto bg-gray-100">
              <Document
                file={location.state.pdf[0]}
                onLoadSuccess={onLoadSuccess}
                onLoadError={(error) =>
                  console.error("Error loading document:", error)
                }
              >
              
                    <Page
                      pageNumber={1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />

                          
                    {totalPages > 1 && (
                      <Page
                        pageNumber={numPage}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                        
                      )}
              </Document>

            </div>
          </div> */}

            <div className="flex mt-10 justify-center items-center gap-2 absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="sm:w-[13rem] w-[20rem] h-[15rem] rounded-[0.5rem] overflow-y-auto">
                {/* Display the first page */}
                <Document
                  file={location.state.pdf[0]}
                  onLoadSuccess={onLoadSuccess}
                  onLoadError={(error) =>
                    console.error("Error loading document:", error)
                  }
                >
                  <Page
                    pageNumber={parseInt(fromPage, 10)}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                      <Text
                      style={{
                        position: 'absolute',
                        top: 'calc(90% - 5px)',  // Adjust this value to move it up or down
                        left: '25%',
                        transform: 'translateX(-50%)',
                        fontSize: '12px',
                      }}
                      >  {parseInt(fromPage, 10)}</Text>

                </Document>
              </div>

              <div className="sm:w-[13rem] w-[20rem] h-[15rem] rounded-[0.5rem] overflow-y-auto">
                {/* Display the last page if there are more than one page */}
                {totalPages > 1 && (
                  <Document
                    file={location.state.pdf[0]}
                    onLoadSuccess={onLoadSuccess}
                    onLoadError={(error) =>
                      console.error("Error loading document:", error)
                    }
                  >
                    <Page
                      pageNumber={parseInt(toPage, 10)}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />

                      <Text
                      style={{
                        position: 'absolute',
                        top: 'calc(90% - 5px)',  
                        left: '75%',
                        transform: 'translateX(-50%)',
                        fontSize: '12px',
                      }}
                      >  Page {parseInt(toPage, 10)}</Text>
                    
                  </Document>
                )}
              </div>
            </div>

     
        </div>

        <div className="w-[18rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative">
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg text-center pl-4 pr-4">Split PDF</p>
          </div>

          <div className="w-[100%] pr-2">
            <div className="flex gap-2 mt-3">
              <div
                style={{ border: "1px solid #D9D9D9" }}
                className="w-[50%] p-2 flex justify-center items-center flex-col "
              >
                <img src={RangeIcon} alt="" />
                <p className="text-sm mt-2">Split by range</p>
              </div>
              <div className="w-[50%] p-2 flex justify-center items-center flex-col">
                <img src={PagesIcon} alt="" />
                <p className="text-sm mt-2">Extract by pages</p>
              </div>
            </div>
          </div>

          <div className="w-[100%] pr-2 pl-2 mt-4">
            <p className="tex-[#474747] mb-2">Range Mode:</p>

            <div className="flex justify-between items-center">
              <div className="w-[45%]">
                <button
                  style={{ border: "1px solid #20808d" }}
                  className="text-[#20808d] w-[100%] h-[2.6rem] rounded-[0.375rem]"
                >
                  Custom
                </button>
              </div>

              <div className="w-[45%]">
                <button className="bg-[#F4F4F4] w-[100%] h-[2.6rem] rounded-[0.375rem]">
                  Fixed
                </button>
              </div>
            </div>
          </div>

          <div className="w-[100%] pr-2 pl-2 mt-4">
            <p className="tex-[#474747] mb-2">Range Mode:</p>

            <div className="flex justify-between gap-x-2 items-center">
              <div className="w-[50%]">
                <div className="border border-black w-[100%] h-[3rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1">
                  <p className="text-sm">from page</p>
                  <div className="w-[1px] h-[100%] bg-black"></div>
                  <input
                    type="number"
                    value={fromPage}
                    min="1"  
                    onChange={handleFromPageChange}
                    className="text-sm w-[40%] outline-none"
                  />
                </div>
              </div>

              <div className="w-[50%]">
                <div className="border border-black w-[100%] h-[3rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1">
                  <p className="text-sm">to</p>
                  <div className="w-[1px] h-[100%] bg-black"></div>
                  <input
                    type="number"
                    value={toPage}
                    onChange={handleToPageChange}
                    max={numPage} 
                    className="text-sm w-[40%] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[2rem]">
            <button
              style={{ border: "1px solid #20808D" }}
              className="text-[#20808D] rounded-md p-2 flex justify-center items-center gap-2"
            >
              <AiOutlinePlus className="text-[#20808D]" />
              Add range
            </button>
          </div>

          <div className="mt-[1rem]">
            <p className="text-center text-[#474747]">
              Merge all ranges in one PDF file
            </p>
          </div>

          <div className=" absolute bottom-3 flex justify-center items-center">
            <button
              className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md"
              onClick={splitHandler}
              
            >
              Split PDF
            </button>
          </div>
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
            <div className="w-[18rem] h-[100vh] bg-white md:hidden shadow-CardShadow absolute top-0 right-0 p-4 flex justify-start items-center flex-col">
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
                <p className="text-lg text-center pl-4 pr-4">Split PDF</p>
              </div>

              <div className="w-[100%] pr-2">
                <div className="flex gap-2 mt-3">
                  <div
                    style={{ border: "1px solid #D9D9D9" }}
                    className="w-[50%] p-2 flex justify-center items-center flex-col "
                  >
                    <img src={RangeIcon} alt="" />
                    <p className="text-sm mt-2">Split by range</p>
                  </div>
                  <div className="w-[50%] p-2 flex justify-center items-center flex-col">
                    <img src={PagesIcon} alt="" />
                    <p className="text-sm mt-2">Extract by pages</p>
                  </div>
                </div>
              </div>

              <div className="w-[100%] pr-2 pl-2 mt-4">
                <p className="tex-[#474747] mb-2">Range Mode:</p>

                <div className="flex justify-between items-center">
                  <div className="w-[45%]">
                    <button
                      style={{ border: "1px solid #20808d" }}
                      className="text-[#20808d] w-[100%] h-[2.6rem] rounded-[0.375rem]"
                    >
                      Custom
                    </button>
                  </div>

                  <div className="w-[45%]">
                    <button className="bg-[#F4F4F4] w-[100%] h-[2.6rem] rounded-[0.375rem]">
                      Fixed
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-[100%] pr-2 pl-2 mt-4">
                <p className="tex-[#474747] mb-2">Range Mode:</p>

                <div className="flex justify-between gap-x-2 items-center">
                  <div className="w-[50%]">
                    <div
                      style={{ border: "1px solid black" }}
                      className="w-[100%] h-[3rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1"
                    >
                      <p className="text-sm">from page</p>
                      <div className="w-[1px] h-[100%] bg-black"></div>
                      <p className="text-sm">1</p>
                    </div>
                  </div>

                  <div className="w-[50%]">
                    <div
                      style={{ border: "1px solid black" }}
                      className="w-[100%] h-[3rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1"
                    >
                      <p className="text-sm">to</p>
                      <div className="w-[1px] h-[100%] bg-black"></div>
                      <p className="text-sm">2</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[2rem]">
                <button
                  style={{ border: "1px solid #20808D" }}
                  className="text-[#20808D] rounded-md p-2 flex justify-center items-center gap-2"
                >
                  <AiOutlinePlus className="text-[#20808D]" />
                  Add range
                </button>
              </div>

              <div className="mt-[1rem]">
                <p className="text-center text-[#474747]">
                  Merge all ranges in one PDF file
                </p>
              </div>

              <div className=" absolute bottom-3 flex justify-center items-center">
                <button className="bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md">
                  Merge PDF
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
     )}
     </>
  );
};

export default SplitPdfContent;
