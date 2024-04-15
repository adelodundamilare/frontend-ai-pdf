import Main from "../../../components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const OCRPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"OCR Your Pdf"}
        link={"/pdf/OCR/content"}
        description={
          "Easily convert scanned pdf into searchable and selectable document."
        }
      />
    </DashboardLayout>
  );
};

export default OCRPdfScreen;
