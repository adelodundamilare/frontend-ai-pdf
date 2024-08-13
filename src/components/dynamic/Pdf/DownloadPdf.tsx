import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
//
import { authRequest } from "@/config/baseUrl";
import ProgressModal from "@/components/Progress";
import PdfImage from "../../../assets/pdf.png";
import GalleryImage from "../../../assets/gallery.svg";
import ListImage from "../../../assets/list.svg";
import DotImage from "../../../assets/dot.svg";
import { IUploads } from "@/lib/types";
import { extractFilenameFromUrl, formattedDate } from "@/constants/helpers";

interface Prop {
  title: string;
}
const DownloadPdf = ({ title }: Prop) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [showPopup, setshowPopup] = useState<{ show: boolean; id: any }>({
    show: false,
    id: null,
  });
  const [verticalView, setverticalView] = useState(true);
  const [data, setData] = useState<IUploads[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const downloadPDF = async (fileUrl: any) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", extractFilenameFromUrl(fileUrl));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //   onClose();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await authRequest.get("/history/user_downloads/");
      setData(response.data.data);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renameUpload = async (item: any) => {
    try {
      setIsLoading(true);
      const response = await authRequest.post(`/history/rename_upload/`, {
        name: "name new",
        id: item.id,
      });
    } catch (error) {
      console.error("Error", error);
      toast.error(`Unable to update File, please try again`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUpload = async (item: any) => {
    try {
      setIsLoadingModal(true);
      const response = await authRequest.delete(
        `/history/delete_upload/${item?.id}/`
      );
      if (response) {
        await fetchData();
      }
    } catch (error) {
      console.error("Error", error);
      toast.error(`Unable to delete File, please try again`);
    } finally {
      setIsLoadingModal(false);
    }
  };

  if (isLoading) {
    return <ProgressModal isLoading={isLoading} />;
  }

  return (
    <>
      {/* MAIN COMPONENT  */}
      <div className="h-[100%] w-[100%] pt-5 pb-5">
        {/* MAIN HEADING  */}
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl">{title}</h1>
          <p className="text-[#505050] mt-2">
            Access your downloaded file history
          </p>
        </div>

        {/* CHANGE UI STYLE ORDER ICONS */}
        <div className="flex justify-end gap-x-4 w-[100%] pr-5 sm:mb-0 mb-3">
          <div
            onClick={() => setverticalView(true)}
            className="w-[2rem] h-[2rem] cursor-pointer rounded-md bg-[#D9d9d9] flex justify-center items-center"
          >
            <img src={GalleryImage} alt="" />
          </div>

          <div
            onClick={() => setverticalView(false)}
            className="w-[2rem] h-[2rem] cursor-pointer rounded-md bg-[#D9d9d9] flex justify-center items-center"
          >
            <img src={ListImage} alt="" />
          </div>
        </div>

        {data && data.length === 0 && (
          <div className="flex justify-center items-center h-[20rem]">
            <h1>No record found</h1>
          </div>
        )}

        {/* MAIN PDF CONTENT  */}
        {verticalView ? (
          <div className="flex justify-center items-center flex-wrap mt-3  md:ml-[5rem] sm:ml-[3.5rem] ml-0">
            <div className="flex w-[80%] justify-start items-center flex-wrap gap-2">
              {data &&
                data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ border: "1px solid #d9d9d9" }}
                      className="sm:w-[15rem] relative w-[100%] mb-2 sm:mb-0 h-[12rem] rounded-md shadow-CardShadow p-3"
                    >
                      <div className="flex justify-end">
                        <div
                          style={{ border: "1px solid #d9d9d9" }}
                          onClick={() =>
                            setshowPopup({
                              show: showPopup.id === item ? false : true,
                              id: item,
                            })
                          }
                          className="w-[3rem] h-[1.2rem] cursor-pointer rounded-lg flex justify-center items-center"
                        >
                          <img src={DotImage} alt="" />
                        </div>
                      </div>

                      <div className="flex justify-center items-center">
                        <button onClick={() => downloadPDF(item?.file ?? "")}>
                          <img
                            // src={index % 2 != 0 ? PdfImage : DocImage}
                            src={PdfImage}
                            alt=""
                          />
                        </button>
                      </div>

                      <div className="flex justify-center items-center mt-4">
                        <p className="text-[#303030]">
                          {item?.file_name ?? formattedDate(item?.created_at)}
                        </p>
                      </div>

                      {showPopup.show === true && showPopup.id === item ? (
                        <div className="bg-[#D9D9D9] absolute top-10 h-[7rem] right-2 w-[10rem] rounded-lg flex justify-center items-center flex-col">
                          {/* <button
                            onClick={() => renameUpload(item)}
                            style={{ border: "1px solid #D9D9D9" }}
                            className="flex w-[90%] cursor-pointer p-2 items-center justify-between bg-[#F5f5f5] rounded-lg"
                          >
                            <p>Rename</p>
                            <CiEdit />
                          </button> */}
                          <button
                            onClick={() => deleteUpload(item)}
                            style={{ border: "1px solid #D9D9D9" }}
                            className="flex w-[90%] cursor-pointer p-2 items-center justify-between bg-[#F5f5f5] rounded-lg mt-1"
                          >
                            <p>Delete</p>
                            <CiTrash />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className=" ml-14 sm:mr-14 mr-3">
            {data &&
              data?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex relative md:w-[50%] sm:w-[80%] w-[100%] items-center gap-x-6 mb-4"
                  >
                    <img
                      src={PdfImage}
                      alt=""
                      className="w-[2.5rem] h-[2.5rem]"
                    />
                    <p className="text-sm">
                      {item?.file_name ?? item?.created_at}
                    </p>
                    <div
                      style={{ border: "1px solid #d9d9d9" }}
                      onClick={() =>
                        setshowPopup({
                          show: showPopup.id === item ? false : true,
                          id: item,
                        })
                      }
                      className="w-[3rem] h-[1.2rem] cursor-pointer rounded-lg flex justify-center items-center"
                    >
                      <img src={DotImage} alt="" />
                    </div>
                    {showPopup.show === true && showPopup.id === item ? (
                      <div className="bg-[#D9D9D9] absolute top-0 h-[6rem] right-2 w-[10rem] rounded-lg flex justify-center items-center flex-col">
                        {/* <button
                          onClick={() => renameUpload(item?.file ?? "")}
                          style={{ border: "1px solid #D9D9D9" }}
                          className="flex w-[90%] cursor-pointer p-1 pl-2 pr-2 items-center justify-between bg-[#F5f5f5] rounded-lg"
                        >
                          <p>Rename</p>
                          <CiEdit />
                        </button> */}
                        <button
                          onClick={() => deleteUpload(item)}
                          style={{ border: "1px solid #D9D9D9" }}
                          className="flex w-[90%] cursor-pointer p-1 pl-2 pr-2 items-center justify-between bg-[#F5f5f5] rounded-lg mt-1"
                        >
                          <p>Delete</p>
                          <CiTrash />
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default DownloadPdf;
