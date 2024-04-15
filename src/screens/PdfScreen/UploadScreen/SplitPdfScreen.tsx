import Main from "@/components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const SplitPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"Split PDF file"}
        link={"/pdf/split/content"}
        description={
          "Separate one page or a whole set for easy conversion into independent PDF files."
        }
      />
    </DashboardLayout>
  );
};

export default SplitPdfScreen;
