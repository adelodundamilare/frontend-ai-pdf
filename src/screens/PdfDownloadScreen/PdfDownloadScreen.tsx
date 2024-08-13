import DownloadPdf from "../../components/dynamic/Pdf/DownloadPdf";
import DashboardLayout from "@/layouts/dashboard-layout";
const PdfDownloadScreen = () => {
  return (
    <DashboardLayout>
      <DownloadPdf title={"Downloaded Files"} />
    </DashboardLayout>
  );
};

export default PdfDownloadScreen;
