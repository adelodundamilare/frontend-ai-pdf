import React from "react";
import Dashboard from "../../../components/dynamic/Dashboard/Dashboard";
import Main from "../../../components/static/RightSide/Pdf/Main";

const EditPdfScreen = () => {
  return (
    <>
      <Dashboard
        component={
          <Main
            title={"Edit PDF file"}
            link={"/pdf/edit/content"}
            description={"Edit your PDF file."}
          />
        }
      />
    </>
  );
};

export default EditPdfScreen;
