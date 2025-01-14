import UploadAndDownloadPdf from "../../components/dynamic/Pdf/UploadAndDownloadPdf";
import DashboardLayout from "@/layouts/dashboard-layout";

const PdfUploadScreen = () => {
  return (
    <DashboardLayout>
      <UploadAndDownloadPdf title={"Uploaded Files"} />
    </DashboardLayout>
  );
};

export default PdfUploadScreen;
