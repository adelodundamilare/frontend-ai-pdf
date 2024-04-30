import React from "react";
import Modal from "react-modal";
import ProgressBar from "@ramonak/react-progress-bar";
import { ColorRing } from "react-loader-spinner";

const ProgressModal = ({ isLoading }) => {
  return (
    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={closeModal}
    //   contentLabel="Progress Modal"
    //   style={{
    //     content: {
    //       height: "200px",
    //       width: "500px",
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "center",
    //       backgroundColor: "#fff",
    //       padding: "20px",
    //       borderRadius: "8px",
    //       marginInline: "auto",
    //       marginBlock: "auto",
    //       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    //     },
    //   }}
    // >
    //   <div className="modal-content ">
    //     <h2 className="mb-3">Processing</h2>
    //     <ProgressBar completed={progress} maxCompleted={100} bgColor="red" />
    //   </div>
    // </Modal>
    <div className="relative h-screen flex  justify-center items-center">
      <ColorRing
        visible={isLoading}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default ProgressModal;
