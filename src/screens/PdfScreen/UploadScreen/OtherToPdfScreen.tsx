import Main from "@/components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const OtherToPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"Other File Formats to PDF file"}
        link={"/pdf/other/to/pdf/content"}
        description={
          "Turn your DOC, PPT, EXCEL, JPEG, PPTX and DOCX documents into PDF file. First by Choosing file format and then uploading the file accordingly "
        }
      />
    </DashboardLayout>
  );
};

export default OtherToPdfScreen;
