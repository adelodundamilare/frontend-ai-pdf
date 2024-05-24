import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
//
import Left from "@/components/static/LeftSide/Left";
import LoginAndRegistrationPopup from "@/components/dynamic/Popup/LoginAndRegistrationPopup";
import EmailPopup from "@/components/dynamic/Popup/EmailPopup";
import ForgotPopup from "@/components/dynamic/Popup/ForgotPopup";
import SubscriptionPopup from "@/components/dynamic/Popup/SubscriptionPopup";

interface Prop {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: Prop) => {
  const [showSubscriptionPopup, setshowSubscriptionPopup] = useState(false);
  const [showSideBar, setshowSideBar] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);
  const [isLogin, setisLogin] = useState(true);
  const [isEmailPopup, setisEmailPopup] = useState(false);
  const [isForgotPopup, setisForgotPopup] = useState(false);

  return (
    <div className="flex items-start w-screen h-screen">
      <div className="lg:block hidden">
        <Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
      </div>
      <div className="flex-1">
        <div className="w-[100%] h-screen font-roboto pb-4 pl-3 pr-3 lg:pl-[1rem] lg:pr-[1rem] relative overflow-x-hidden overflow-y-auto">
          <div>
            {/* HAMBURGER MENU  */}
            <div className="block absolute top-3 left-4 lg:hidden">
              <GiHamburgerMenu
                className="text-2xl cursor-pointer"
                onClick={() => setshowSideBar(!showSideBar)}
              />
            </div>

            {children}
          </div>
        </div>

        {/* children */}
      </div>

      {/* RESPONSIVE SIDE BAR COMPONENT  */}
      {showSideBar && (
        <div className="lg:hidden block absolute top-0 left-0">
          <Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
        </div>
      )}
      {showPopUp && (
        <div className=" absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50">
          <div className=" w-[100%] h-[100%] flex justify-center items-center opacity-100">
            <div className=" mt-auto mb-auto flex justify-center items-center opacity-100">
              <LoginAndRegistrationPopup />
            </div>
          </div>
        </div>
      )}

      {isEmailPopup && (
        <div className=" absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50">
          <div className=" w-[100%] h-[100%] flex justify-center items-center opacity-100">
            <div className=" mt-auto mb-auto flex justify-center items-center opacity-100">
              <EmailPopup
                isForgotPopup={isForgotPopup}
                setisForgotPopup={setisForgotPopup}
                isLogin={isLogin}
                setisLogin={setisLogin}
              />
            </div>
          </div>
        </div>
      )}

      {isForgotPopup && (
        <div className=" absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50">
          <div className=" w-[100%] h-[100%] flex justify-center items-center opacity-100">
            <div className=" mt-auto mb-auto flex justify-center items-center opacity-100">
              <ForgotPopup shouldUpdate={true} />
            </div>
          </div>
        </div>
      )}

      {showSubscriptionPopup && (
        <div className=" absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50">
          <div className=" w-[100%] h-[100%] flex justify-center items-center opacity-100">
            <div className=" mt-auto mb-auto flex justify-center items-center opacity-100">
              <SubscriptionPopup />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
