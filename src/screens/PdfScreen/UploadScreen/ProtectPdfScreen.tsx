import Main from "@/components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const ProtectPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"Protect PDF file"}
        link={"/pdf/protect/content"}
        description={
          "Encrypt your PDF with a password to keep sensitive data confidential."
        }
      />
    </DashboardLayout>
  );
};

export default ProtectPdfScreen;
