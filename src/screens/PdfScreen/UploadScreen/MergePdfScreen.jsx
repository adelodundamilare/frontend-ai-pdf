import React from "react";
import Dashboard from "../../../components/dynamic/Dashboard/Dashboard";
import Main from "../../../components/static/RightSide/Pdf/Main";

const MergePdfScreen = () => {
  return (
    <>
      <Dashboard
        component={
          <Main
            title={"Merge PDF files"}
            link={"/pdf/merge/content"}
            description={"Combine PDFs in the order you want."}
          />
        }
      />
    </>
  );
};

export default MergePdfScreen;
