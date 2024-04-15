// LEFT NAV LINKS

import React, { useState, useEffect } from "react";
import SearchIcon from "../../../assets/search.svg";
import PdfIcon from "../../../assets/pdf.svg";
import LibraryIcon from "../../../assets/library.svg";
import HistoryIcon from "../../../assets/history.svg";
import MessageIcon from "../../../assets/msg.svg";
import PenIcon from "../../../assets/pen.svg";
import TrashIcon from "../../../assets/trash.svg";
import UpArrowIcon from "../../../assets/uparrow.svg";
import SettingIcon from "../../../assets/setting.svg";
import ProfileImage from "../../../assets/profile.png";
import Logo from "../../../assets/logo1.png";

import "./style.css";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config/baseUrl";
import axios from "axios";
// import SubscriptionPopup from './../../dynamic/Popup/SubscriptionPopup'

const Left = ({ setshowSideBar, showSidebar }: any) => {
  const [userProfile, setUserProfile] = useState([]);
  const [username, setUsername] = useState("");
  // const [showSubscriptionPopup, setshowSubscriptionPopup] = useState(false)

  const [showLibrary, setshowLibrary] = useState(false);
  const [showHistory, setshowHistory] = useState(false);
  const arr = [2, 2, 2, 2, 22, 2, 2, 2, 2, 2];
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const get_user_profile = async () => {
      const profileResponse = await axios.get(`${BASE_URL}/accounts/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const userProfile1 = profileResponse.data;
      const username = userProfile1[0].email;
      setUsername(username);
    };

    get_user_profile();
  }, []);

  const handleUpgradePlan = () => {
    // Redirect to the subscription page
    nav("/subscription");
  };

  return (
    <div className="w-[16rem] h-screen relative overflow-y-auto bg-[#36454F] text-white font-roboto p-4">
      <div>
        {/* HAMBURGER MENU  */}
        <div className="block absolute top-3 right-4 lg:hidden">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => setshowSideBar(false)}
          />
        </div>
        {/* BRAND NAME  */}
        <div className="mb-3">
          {/* <h1 className='text-lg font-semibold tracking-wider'>Power Ai Tool</h1> */}
          <img src={Logo} alt="" className="h-[1.6rem]" />
        </div>

        {/* MAIN NAV LINKS  */}

        <div className="mt-10">
          {/* HOME LINK  */}
          <div
            className="flex items-center gap-4 cursor-pointer mb-4 hover:bg-[#445662] p-2 rounded-md"
            onClick={() => nav("/dashboard")}
          >
            <img
              src={SearchIcon}
              alt="search-icon"
              className="w-[1rem] h-[1rem]"
            />
            <p className="tracking-wider text-[#FFF]">Home</p>
          </div>

          {/* PDF LINK  */}
          <div
            className="flex items-center gap-4 cursor-pointer mb-4 hover:bg-[#445662] p-2 rounded-md"
            onClick={() => nav("/pdf/tool")}
          >
            <img
              src={PdfIcon}
              alt="search-icon"
              className="w-[1rem] h-[1rem]"
            />
            <p className="tracking-wider text-[#FFF] text-sm">
              PDF Management Tools
            </p>
          </div>

          {/* LIBRARY LINK AND IT'S SUB CATEGORIES LINK  */}
          <div className="flex justify-between items-center cursor-pointer mb-3 hover:bg-[#445662] p-2 rounded-md">
            <div className="flex items-center gap-4">
              <img
                src={LibraryIcon}
                alt="search-icon"
                className="w-[1rem] h-[1rem]"
              />
              <p className="tracking-wider text-[#FFF]">Library</p>
            </div>

            <div onClick={() => setshowLibrary(!showLibrary)}>
              {!showLibrary ? (
                <BiSolidDownArrow
                  className="text-white cursor-pointer"
                  onClick={() => setshowLibrary(!showLibrary)}
                />
              ) : (
                <BiSolidUpArrow
                  className="text-white cursor-pointer"
                  onClick={() => setshowLibrary(!showLibrary)}
                />
              )}
            </div>
          </div>

          {/* SUB LIBRARY CATEGORIES LINK  */}
          <div className="mb-4">
            {showLibrary ? (
              <div className="flex gap-6 items-center">
                {/* LEFT LINE  */}
                <div className="w-[1px] h-[4rem] bg-[#D8D8CF99]"></div>
                {/* MAIN CONTENT  */}
                <div>
                  <p
                    onClick={() => nav("/pdf/upload")}
                    className="mb-1 tracking-wider text-sm cursor-pointer"
                  >
                    Uploaded
                  </p>
                  <p
                    onClick={() => nav("/pdf/download")}
                    className="tracking-wider text-sm cursor-pointer"
                  >
                    Downloaded
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* HISTORY LINK AND IT'S SUB CATEGORIES LINK  */}

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

          {/* SUB HISTORY CATEGORIES LINK  */}
          {showHistory ? (
            <div
              className={`${
                showHistory && showLibrary ? "h-[3rem]" : "h-[10rem]"
              } overflow-scroll`}
            >
              <div className="ml-5 mb-4">
                {/* MAIN SERACH LIST  */}
                {arr?.map((item, index) => {
                  return (
                    <div key={index + item}>
                      <div className="w-[100%] hover:bg-[#445662] p-2 rounded-md mb-1 cursor-pointer relative group">
                        <div className="flex gap-2 items-center">
                          <img
                            src={MessageIcon}
                            alt="message-icon"
                            className="w-[1rem] h-[1rem]"
                          />
                          <p className="tracking-wider text-sm ellipsis-text w-[7rem]">
                            Legal Breakdown
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

          {/* FOOTER  */}

          <div className="absolute bottom-2 ">
            {/* LINE  */}

            <div className="w-[100%] h-[1px] bg-[#D8D8CF99]"></div>

            <h1>Try Pro</h1>
            <p className="text-sm  w-[13rem]">
              Upgrade to upload more files and download PDF edits.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <img src={UpArrowIcon} alt="" className="w-[1rem] h-[1rem]" />
              <button className="text-sm" onClick={handleUpgradePlan}>
                Upgrade Plan
              </button>
            </div>

            {/* {
              showSubscriptionPopup && (
                <div className=' absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50'>
                  <div className=' w-[100%] h-[100%] flex justify-center items-center opacity-100'>
                    <div className=' mt-auto mb-auto flex justify-center items-center opacity-100'>
                      <SubscriptionPopup setshowSubscriptionPopup={setshowSubscriptionPopup} />
                    </div>
                  </div>
                </div>
              )
            } */}

            <div
              className="flex justify-between items-center gap-2 mt-3 cursor-pointer"
              onClick={() => nav("/profile")}
            >
              <div className="flex items-center gap-2">
                <img
                  src={ProfileImage}
                  alt=""
                  className=""
                  onClick={() => nav("/profile")}
                />
                <p className="text-sm ellipsis-text2 w-[6rem]">
                  {username ? username.split("@")[0] : "Guest"}
                </p>
              </div>

              <div>
                <img src={SettingIcon} alt="" className="w-[1rem] h-[1rem]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
