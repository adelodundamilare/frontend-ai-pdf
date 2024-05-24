import React, { useState } from "react";
import { authRequest } from "../../../config/baseUrl";
import { toast } from "react-toastify";

interface Prop {
  callback: () => any;
  closeFunc: () => any;
}
const UpdateNamePopup = ({ callback, closeFunc }: Prop) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      await authRequest.put("/accounts/update-name/", {
        name,
      });
      toast.success(`Success: Your name has been updated`);
      callback();
    } catch (error: any) {
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
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className=" bg-white w-fit font-roboto p-3 rounded-md">
        <h1 className="text-center text-xl">Update your Name</h1>

        <div className="flex justify-center items-center mt-2">
          <p className="text-[#20808D] text-center w-[20rem] ">
            Enter your Full name in the box provided.
          </p>
        </div>

        <div className="flex justify-center items-center mb-2 flex-col mt-4">
          <input
            style={{ border: "1px solid #D9D9D9" }}
            type="text"
            placeholder="Full Name"
            className="p-2 w-[19rem] placeholder:text-[#D9D9D9] rounded-md mb-4 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center mb-2">
          <button
            onClick={handleSubmit}
            className="p-2 w-[19rem] rounded-md text-white bg-[#20808D] tracking-wider"
          >
            Continue
          </button>
        </div>

        <div className="flex justify-center items-center">
          <span className="text-[#20808D] cursor-pointer" onClick={closeFunc}>
            Go Back
          </span>
        </div>
      </div>
    </div>
  );
};

export default UpdateNamePopup;
