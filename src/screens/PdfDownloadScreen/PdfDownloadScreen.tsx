import UploadAndDownloadPdf from "../../components/dynamic/Pdf/UploadAndDownloadPdf";
import DashboardLayout from "@/layouts/dashboard-layout";
const PdfDownloadScreen = () => {
  return (
    <DashboardLayout>
      <UploadAndDownloadPdf title={"Downloaded Files"} />
    </DashboardLayout>
  );
};

export default PdfDownloadScreen;
