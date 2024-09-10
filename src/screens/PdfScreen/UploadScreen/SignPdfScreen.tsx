import DashboardPdfLayout from "@/layouts/dashboard-pdf-layout";
import DragNDrop from "@/components/drag-n-drop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignPdfScreen = () => {
  const nav = useNavigate();

  const handleClick = async (event: any) => {
    const selectedFiles: any[] = event.target.files;

    if (selectedFiles.length < 1) {
      toast.warn("Please select a pdf files.");
    } else {
      nav("/pdf/sign/content", { state: { pdf: selectedFiles } });
    }
  };

  return (
    <DashboardPdfLayout
    title={"Sign PDF"}
    description="Sign or request electronic signatures from others."
  >
    <DragNDrop handleClick={handleClick} multiple={true} />
  </DashboardPdfLayout>
  );
};

export default SignPdfScreen;
