import Main from "@/components/static/RightSide/Pdf/Main";
import DashboardLayout from "@/layouts/dashboard-layout";

const SignPdfScreen = () => {
  return (
    <DashboardLayout>
      <Main
        title={"Sign Pdf"}
        link={"/pdf/sign/content"}
        description={"Sign or request electronic signatures from others."}
      />
    </DashboardLayout>
  );
};

export default SignPdfScreen;
