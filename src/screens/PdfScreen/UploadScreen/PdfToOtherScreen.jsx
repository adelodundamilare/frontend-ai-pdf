import React from "react";
import Dashboard from "../../../components/dynamic/Dashboard/Dashboard";
import Main from "../../../components/static/RightSide/Pdf/Main";

const PdfToOtherScreen = () => {
  return (
    <>
      <Dashboard
        component={
          <Main
            title={"PDF File to Other File Formats"}
            link={"/pdf/to/other/content"}
            description={
              "Easily convert your PDF files into DOC, PPT, EXCEL, JPEG, PPTX and DOCX documents. "
            }
          />
        }
      />
    </>
  );
};

export default PdfToOtherScreen;
