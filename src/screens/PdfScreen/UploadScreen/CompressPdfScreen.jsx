import React from "react";
import Dashboard from "../../../components/dynamic/Dashboard/Dashboard";
import Main from "../../../components/static/RightSide/Pdf/Main";

const CompressPdfScreen = () => {
  return (
    <>
      <Dashboard
        component={
          <Main
            title={"Compress PDF file"}
            link={"/pdf/compress/content"}
            description={
              "Reduce file size while optimizing for maximal PDF quality."
            }
          />
        }
      />
    </>
  );
};

export default CompressPdfScreen;
