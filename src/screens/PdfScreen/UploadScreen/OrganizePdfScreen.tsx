import DashboardPdfLayout from "@/layouts/dashboard-pdf-layout";
import DragNDrop from "@/components/drag-n-drop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrganizePdfScreen = () => {
  const nav = useNavigate();

  const handleClick = async (event: any) => {
    const selectedFiles: any[] = event.target.files;

    if (selectedFiles.length < 1) {
      toast.warn("Please select more than one file.");
    } else {
      nav("/pdf/organize/content", {
        state: { pdf: Array.from(selectedFiles) },
      });
    }
  };

  return (
    <DashboardPdfLayout
      title={"Organize Your Pdf"}
      description="Easily organize your PDF files."
    >
      <DragNDrop handleClick={handleClick} multiple={true} />
    </DashboardPdfLayout>
  );
};

export default OrganizePdfScreen;
