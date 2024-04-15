import Main from "@/components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const EditPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"Edit PDF file"}
        link={"/pdf/edit/content"}
        description={"Edit your PDF file."}
      />
    </DashboardLayout>
  );
};

export default EditPdfScreen;
