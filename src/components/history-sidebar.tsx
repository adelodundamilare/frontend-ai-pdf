import { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import MessageIcon from "@/assets/msg.svg";
import PenIcon from "@/assets/pen.svg";
import TrashIcon from "@/assets/trash.svg";

import HistoryIcon from "@/assets/history.svg";
import { authRequest } from "@/config/baseUrl";
import { IHistory } from "@/lib/types";

const HistorySidebar = () => {
  const [showHistory, setshowHistory] = useState(false);
  const [history, setHistory] = useState<IHistory[]>([]);

  useEffect(() => {
    const fetchLatestHistory = async () => {
      const res = await authRequest.get("/history/latest/");
      console.log({ res });
      setHistory(res?.data?.data);
    };

    fetchLatestHistory();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center cursor-pointer mb-3 hover:bg-[#445662] p-2 rounded-md">
        <div className="flex items-center gap-4">
          <img
            src={HistoryIcon}
            alt="search-icon"
            className="w-[1rem] h-[1rem]"
          />
          <p className="tracking-wider text-[#FFF]">History</p>
        </div>

        <div onClick={() => setshowHistory(!showHistory)}>
          {!showHistory ? (
            <BiSolidDownArrow
              className="text-white cursor-pointer"
              onClick={() => setshowHistory(!showHistory)}
            />
          ) : (
            <BiSolidUpArrow
              className="text-white cursor-pointer"
              onClick={() => setshowHistory(!showHistory)}
            />
          )}
        </div>
      </div>

      {showHistory && history.length < 1 && (
        <p className="h-[120px] grid place-content-center">No history data</p>
      )}

      {/* SUB HISTORY CATEGORIES LINK  */}
      {showHistory ? (
        <div
          className={`${
            showHistory ? "h-[3rem]" : "h-[10rem]"
          } overflow-scroll`}
        >
          <div className="ml-5 mb-4">
            {history?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="w-[100%] hover:bg-[#445662] p-2 rounded-md mb-1 cursor-pointer relative group">
                    <div className="flex gap-2 items-center">
                      <img
                        src={MessageIcon}
                        alt="message-icon"
                        className="w-[1rem] h-[1rem]"
                      />
                      <p className="tracking-wider text-sm ellipsis-text w-[7rem]">
                        {item?.title ?? ""}
                      </p>
                      <div className="flex w-[100%] h-fit justify-end gap-2 absolute right-2 opacity-0 group-hover:opacity-100">
                        <img
                          src={PenIcon}
                          alt=""
                          className="w-[1rem] h-[1rem]"
                        />
                        <img
                          src={TrashIcon}
                          alt=""
                          className="w-[1rem] h-[1rem]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HistorySidebar;
