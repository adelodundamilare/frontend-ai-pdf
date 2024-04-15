import Main from "@/components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const CompressPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"Compress PDF file"}
        link={"/pdf/compress/content"}
        description={
          "Reduce file size while optimizing for maximal PDF quality."
        }
      />
    </DashboardLayout>
  );
};

export default CompressPdfScreen;
