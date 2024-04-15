import Main from "@/components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const StampPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"Stamp Pdf"}
        link={"/pdf/stamp/content"}
        description={"Stamp your pdf in seconds. "}
      />
    </DashboardLayout>
  );
};

export default StampPdfScreen;
