import React from "react";
import PdfManagment from "../../components/static/RightSide/PdfManagment/PdfManagment";
import Dashboard from "../../components/dynamic/Dashboard/Dashboard";
const PdfManagmentScreen = () => {
  return (
    <>
      <Dashboard component={<PdfManagment />} />
    </>
  );
};

export default PdfManagmentScreen;
