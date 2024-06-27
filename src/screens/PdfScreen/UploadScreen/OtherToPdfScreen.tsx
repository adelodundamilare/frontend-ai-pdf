import DragNDrop from "@/components/drag-n-drop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardPdfLayout from "@/layouts/dashboard-pdf-layout";

const OtherToPdfScreen = () => {
  const nav = useNavigate();

  const handleClick = async (event: any) => {
    const selectedFiles: any[] = event.target.files;

    if (selectedFiles.length < 1) {
      toast.warn("Please select a PDF file.");
      return;
    }

    nav("/pdf/other/to/pdf/content", {
      state: { docx: Array.from(selectedFiles) },
    });
  };

  return (
    <DashboardPdfLayout
      title={"Other File Formats to PDF file"}
      description="Turn your DOC, PPT, EXCEL, JPEG, PPTX and DOCX documents into PDF file. First by Choosing file format and then uploading the file accordingly"
    >
      <DragNDrop handleClick={handleClick} multiple={true} />
    </DashboardPdfLayout>
  );
};

export default OtherToPdfScreen;
