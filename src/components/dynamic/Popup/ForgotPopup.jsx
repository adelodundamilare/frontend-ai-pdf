import React, { useState } from "react";
import CrossIcon from "../../../assets/cross.svg";
import { authRequest } from "../../../config/baseUrl";
import { toast } from "react-toastify";

const ForgotPopup = ({ shouldUpdate }) => {
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleButtonClick = () => {
    let val = false;
    shouldUpdate(val);
  };

  const handleResetPassword = async () => {
    try {
      const response = await authRequest.post("/accounts/password_reset/", {
        email,
      });

      if (response.status === 200) {
        setShowSuccessMessage(true);
      } else {
        if (response.data && response.data.email) {
          toast.error(`Error: ${response.data.email[0]}`);
        } else {
          toast.error(
            "An error occurred during password reset. Please try again."
          );
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data && error.response.data.email) {
            toast.error(`Error: ${error.response.data.email[0]}`);
          } else {
            toast.error("Invalid request. Please check your input.");
          }
        } else {
          toast.error(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      {showSuccessMessage ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="bg-white w-fit font-roboto p-3 rounded-md">
            <h1 className="text-center text-xl">Success!</h1>
            <p className="text-[#20808D] text-center w-[20rem]">
              Email sent to your account. Please check your email for
              instructions on resetting your password.
            </p>
            <div className="mt-5 flex justify-center items-center">
              <button
                className="p-2 w-[19rem] rounded-md text-white bg-[#20808D] tracking-wider"
                onClick={handleButtonClick}
              >
                Back to Sign in
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className=" bg-white w-fit font-roboto p-3 rounded-md">
            {/* <img src={CrossIcon} alt="" srcset="" className=' float-right cursor-pointer' onClick={() => setisForgotPopup(false)} /> */}
            <h1 className="text-center text-xl">Reset your password</h1>

            <div className="flex justify-center items-center mt-2">
              <p className="text-[#20808D] text-center w-[20rem] ">
                Enter your email address and we will send you instruction to
                reset your password.
              </p>
            </div>

            <div className="flex justify-center items-center mb-2 flex-col mt-4">
              <input
                style={{ border: "1px solid #D9D9D9" }}
                type="text"
                placeholder="Email address"
                className="p-2 w-[19rem] placeholder:text-[#D9D9D9] rounded-md mb-4 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <input style={{ border: "1px solid #D9D9D9" }} type="text" placeholder='Email address' className='p-2 w-[19rem] placeholder:text-[#D9D9D9] rounded-md mb-4 outline-none' /> */}
            </div>

            <div className="flex justify-center items-center mb-2">
              <button
                onClick={handleResetPassword}
                className="p-2 w-[19rem] rounded-md text-white bg-[#20808D] tracking-wider"
              >
                Continue
              </button>
            </div>

            <div className="flex justify-center items-center">
              <span
                className="text-[#20808D] cursor-pointer"
                onClick={handleButtonClick}
              >
                Back to Sign in
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPopup;
