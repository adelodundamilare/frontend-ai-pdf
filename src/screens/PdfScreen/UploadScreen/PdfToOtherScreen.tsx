import DashboardPdfLayout from "@/layouts/dashboard-pdf-layout";
import DragNDrop from "@/components/drag-n-drop";
import { useNavigate } from "react-router-dom";

const PdfToOtherScreen = () => {
  const nav = useNavigate();

  const handleClick = async (event: any) => {
    const selectedFiles: any[] = event.target.files;

    nav("/pdf/to/other/content", {
      state: { pdf: Array.from(selectedFiles) },
    });
  };

  return (
    <DashboardPdfLayout
      title={"PDF File to Other File Formats"}
      description="Easily convert your PDF files into DOC, PPT, EXCEL, JPEG, PPTX and DOCX documents."
    >
      <DragNDrop label="Select PDF File" handleClick={handleClick} />
    </DashboardPdfLayout>
  );
};

export default PdfToOtherScreen;
