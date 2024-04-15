import DashboardPdfLayout from "@/layouts/dashboard-pdf-layout";
import DragNDrop from "@/components/drag-n-drop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MergePdfScreen = () => {
  const nav = useNavigate();

  const handleClick = async (event: any) => {
    const selectedFiles: any[] = event.target.files;

    if (selectedFiles.length !== 2) {
      toast.warn("Please select exactly two files.");
    } else {
      nav("/pdf/merge/content", { state: { pdf: Array.from(selectedFiles) } });
    }
  };

  return (
    <DashboardPdfLayout
      title={"Merge PDF files"}
      description="Combine PDFs in the order you want."
    >
      <DragNDrop handleClick={handleClick} multiple={true} />
    </DashboardPdfLayout>
  );
};

export default MergePdfScreen;
