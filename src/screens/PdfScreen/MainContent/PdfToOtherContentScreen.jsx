import React from "react";
import Dashboard from "../../../components/dynamic/Dashboard/Dashboard";
import PdfToOtherContent from "../../../components/static/RightSide/Pdf/MainContent/PdfToOtherContent";

const PdfToOtherContentScreen = () => {
  return (
    <div>
      <Dashboard component={<PdfToOtherContent />} />
    </div>
  );
};

export default PdfToOtherContentScreen;
