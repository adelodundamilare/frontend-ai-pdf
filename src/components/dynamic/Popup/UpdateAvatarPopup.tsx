import React, { useState } from "react";
import { authRequest } from "../../../config/baseUrl";
import { toast } from "react-toastify";
import AvatarUpload from "@/components/AvatarUpload";

interface Prop {
  callback: () => any;
  closeFunc: () => any;
}
const UpdateAvatarPopup = ({ callback, closeFunc }: Prop) => {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    try {
      await authRequest.put("/accounts/update-avatar/", {
        avatar: value,
      });
      toast.success(`Success: Your avatar has been updated`);
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
        <h1 className="text-center text-xl">Update your Avatar</h1>

        <div className="flex justify-center items-center mb-2 flex-col mt-4">
          <AvatarUpload callback={(url) => setValue(url)} />
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

export default UpdateAvatarPopup;
