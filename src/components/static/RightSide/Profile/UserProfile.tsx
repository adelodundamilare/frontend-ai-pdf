import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//
import BigProfileImage from "../../../../assets/bigProfile.png";
import SettingIcon from "../../../../assets/bsetting.svg";
import EditIcon from "../../../../assets/edit.svg";
import ArrowIcon from "../../../../assets/carrow2.svg";
import QuestionIcon from "../../../../assets/question.png";
import { authRequest } from "@/config/baseUrl";
import { IProfile } from "@/lib/types";
import UpdateNamePopup from "@/components/dynamic/Popup/UpdateNamePopup";
import ProgressModal from "@/components/Progress";
import UpdateAvatarPopup from "@/components/dynamic/Popup/UpdateAvatarPopup";
import { AvatarImage } from "@/components/AvatarUpload";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<IProfile>();
  const [updateNamePopup, setUpdateNamePopup] = useState(false);
  const [updateAvatarPopup, setUpdateAvatarPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // Redirect to the login page
    window.location.reload();
    navigateTo("/login-route"); // Replace with the actual path to your login page
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await authRequest.get("/accounts/profile/");
      setUserProfile(response.data.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ProgressModal isLoading={isLoading} />;
  }

  return (
    <div className="relative">
      <div className="flex-1 font-roboto h-screen overflow-y-auto pt-3 pb-5">
        {/* SETTINGS HEADING DIV AND LINE  */}

        <div className="flex justify-center w-[100%] items-center">
          <h1 className="text-center w-[100%] text-2xl">Settings</h1>
        </div>

        {/* LINE TAG  */}
        <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-5"></div>

        {/* MAIN PROFILE SECTION AND SIDE INFO   */}

        <div className="w-[100%] h-fit mt-4 flex justify-center items-center">
          <div className="sm:w-[50%] w-[80%]">
            {/* USER INFO  */}

            <div>
              {/* ACCOUNT HEADING AND LINE  */}
              <div>
                <h1 className="text-2xl">Account</h1>
                <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-2"></div>
              </div>

              {/* PROFILE INFO  */}
              <div className="w-[100%] bg-[#F5F5F5] p-3 mt-3 rounded-md ">
                {/* APPEARANCE  */}
                <div className="flex justify-between items-center">
                  <div>
                    <p>Appearance</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <img src={SettingIcon} alt="none" />
                    <p>System (Light)</p>
                  </div>
                </div>

                {/* LINE TAG  */}
                <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-5"></div>

                {/* AVATAR  */}
                <div className="flex justify-between items-start mt-4">
                  <div>
                    <p>Avatar</p>
                  </div>

                  <button onClick={() => setUpdateAvatarPopup(true)}>
                    <div className="relative">
                      {/* <img
                        src={userProfile?.avatar ?? BigProfileImage}
                        alt=""
                        className="w-[70px] h-[70px] object-cover rounded-md"
                      /> */}

                      <AvatarImage
                        imageUrl={userProfile?.avatar ?? ""}
                        className="w-[70px] h-[70px]"
                      />
                      <div className="absolute -bottom-2 -right-1 cursor-pointer w-[2rem] h-[2rem] rounded-full bg-[#D9D9D9] flex justify-center items-center">
                        <img src={EditIcon} alt="" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* LINE TAG  */}
                <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-5"></div>
                <div>
                  {/* USER NAME  */}
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p>Username</p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p>
                        {userProfile?.name || userProfile?.email.split("@")[0]}
                      </p>

                      <button onClick={() => setUpdateNamePopup(true)}>
                        <img
                          src={EditIcon}
                          alt=""
                          className=" cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>

                  {/* LINE TAG  */}
                  <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-5"></div>

                  {/* Email  */}
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p>Email</p>
                    </div>

                    <div className="">
                      <p>{userProfile?.email}</p>
                    </div>
                  </div>
                </div>

                {/* LINE TAG  */}
                <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-5"></div>

                {/* Plan  */}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p>Plan</p>
                  </div>

                  <div className="">
                    <p>Free Plan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SITE INFO  */}
            <div className="mt-4">
              {/* ACCOUNT HEADING AND LINE  */}
              <div>
                <h1 className="text-2xl">Site name</h1>
                <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-2"></div>
              </div>

              <div className="w-[100%] bg-[#F5F5F5] pl-4 pr-4 pt-5 pb-5 mt-3 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p>Subscription</p>
                  </div>
                  <Link to="/subscription">
                    <div className="flex gap-2 bg-[#E8E8E3] p-1 rounded-sm cursor-pointer">
                      <img src={ArrowIcon} alt="" />
                      <p>Learn More</p>
                    </div>
                  </Link>
                </div>

                <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-3"></div>

                <div className="flex justify-end gap-3 mt-4">
                  <p className="cursor-pointer" onClick={handleLogout}>
                    Sign out
                  </p>
                  <p className="cursor-pointer">Delete Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DIV FOR SMALL QUESTION MARK LOGO */}
      <div className="absolute bottom-[10px] float-right flex justify-end mr-[10rem] w-[96%]">
        <div className="w-[1.3rem] h-[1.3rem] rounded-full flex justify-center items-center bg-[#36454F] cursor-pointer">
          <img src={QuestionIcon} alt="" />
        </div>
        {/* #36454F */}
      </div>

      {updateNamePopup && (
        <div className=" absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50">
          <div className=" w-[100%] h-[100%] flex justify-center items-center opacity-100">
            <div className=" mt-auto mb-auto flex justify-center items-center opacity-100">
              <UpdateNamePopup
                closeFunc={() => setUpdateNamePopup(false)}
                callback={() => {
                  setUpdateNamePopup(false);
                  fetchUserProfile();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {updateAvatarPopup && (
        <div className=" absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50">
          <div className=" w-[100%] h-[100%] flex justify-center items-center opacity-100">
            <div className=" mt-auto mb-auto flex justify-center items-center opacity-100">
              <UpdateAvatarPopup
                closeFunc={() => setUpdateAvatarPopup(false)}
                callback={() => {
                  setUpdateAvatarPopup(false);
                  fetchUserProfile();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
