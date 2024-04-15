import Main from "@/components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const UnlockPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"Unlock PDF file"}
        link={"/pdf/unlock/content"}
        description={"Unlock your PDF file in just one click."}
      />
    </DashboardLayout>
  );
};

export default UnlockPdfScreen;
