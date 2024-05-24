import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import OnBoardingScreen from "../screens/OnBoardingScreen/OnBoardingScreen";
import DashboardScreen from "../screens/DashboardScreen/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import PdfManagmentScreen from "../screens/PdfManagementScreen/PdfManagmentScreen";
import PdfUploadScreen from "../screens/PdfUploadScreen/PdfUploadScreen";
import PdfDownloadScreen from "../screens/PdfDownloadScreen/PdfDownloadScreen";
import MergePdfScreen from "../screens/PdfScreen/UploadScreen/MergePdfScreen";
import SplitPdfScreen from "../screens/PdfScreen/UploadScreen/SplitPdfScreen";
import CompressPdfScreen from "../screens/PdfScreen/UploadScreen/CompressPdfScreen";
import ProtectPdfScreen from "../screens/PdfScreen/UploadScreen/ProtectPdfScreen";
import UnlockPdfScreen from "../screens/PdfScreen/UploadScreen/UnlockPdfScreen";
import OrganizePdfScreen from "../screens/PdfScreen/UploadScreen/OrganizePdfScreen";
import OrganizePdfContentScreen from "../screens/PdfScreen/MainContent/OrganizePdfContentScreen";
import PdfToOtherScreen from "../screens/PdfScreen/UploadScreen/PdfToOtherScreen";
import OtherToPdfScreen from "../screens/PdfScreen/UploadScreen/OtherToPdfScreen";
import ProtectPdfContentScreen from "../screens/PdfScreen/MainContent/ProtectPdfContentScreen";
import CompressPdfContentScreen from "../screens/PdfScreen/MainContent/CompressPdfContentScreen";
import OthersToPdfContentScreen from "../screens/PdfScreen/MainContent/OthersToPdfContentScreen";
import PdfToOtherContentScreen from "../screens/PdfScreen/MainContent/PdfToOtherContentScreen";
import MergePdfContentScreen from "../screens/PdfScreen/MainContent/MergePdfContentScreen";
import SplitPdfContentScreen from "../screens/PdfScreen/MainContent/SplitPdfContentScreen";
import UnlockPdfContentScreen from "../screens/PdfScreen/MainContent/UnlockPdfContentScreen";
import OCRPdfContentScreen from "../screens/PdfScreen/MainContent/OCRPdfContentScreen";
import OCRPdfScreen from "../screens/PdfScreen/UploadScreen/OCRPdfScreen";
import StampPdfContentScreen from "../screens/PdfScreen/MainContent/StampPdfContentScreen";
import StampPdfScreen from "../screens/PdfScreen/UploadScreen/StampPdfScreen";

import SignPdfContentScreen from "../screens/PdfScreen/MainContent/SignPdfContentScreen";
import SignPdfScreen from "../screens/PdfScreen/UploadScreen/SignPdfScreen";

import EditPdfScreen from "../screens/PdfScreen/UploadScreen/EditPdfScreen";
import EditPdfContentScreen from "../screens/PdfScreen/MainContent/EditPdfContentScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginAndRegistrationPopup from "../components/dynamic/Popup/LoginAndRegistrationPopup";
import SubscriptionPopup from "../components/dynamic/Popup/SubscriptionPopup";
import PaymentPage from "../components/dynamic/Popup/Paymentpage";
import ResetPassword from "../components/dynamic/Popup/ResetPassword";
import SearchCaseScreen from "@/screens/SearchCaseScreen/SearchCaseScreen";
import SearchCaseSingleScreen from "@/screens/SearchCaseScreen/SearchCaseSingleScreen";
import NotFoundScreen from "@/screens/NotFoundScreen";
import { isAuthenticated } from "@/constants/helpers";
import ProtectedRoute from "@/components/ProtectedRoute";

const Routers = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" />
            ) : (
              <OnBoardingScreen />
            )
          }
        />
        <Route
          path="/login-route"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginAndRegistrationPopup />
            )
          }
        />

        <Route
          element={
            <ProtectedRoute redirectPath="/" isAuth={isAuthenticated()} />
          }
        >
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/pdf/tool" element={<PdfManagmentScreen />} />
          <Route path="/pdf/upload" element={<PdfUploadScreen />} />
          <Route path="/pdf/download" element={<PdfDownloadScreen />} />

          <Route path="/pdf/merge" element={<MergePdfScreen />} />
          <Route
            path="/pdf/merge/content"
            element={<MergePdfContentScreen />}
          />

          <Route path="/pdf/split" element={<SplitPdfScreen />} />
          <Route
            path="/pdf/split/content"
            element={<SplitPdfContentScreen />}
          />

          <Route path="/pdf/compress" element={<CompressPdfScreen />} />
          <Route
            path="/pdf/compress/content"
            element={<CompressPdfContentScreen />}
          />

          <Route path="/pdf/organize" element={<OrganizePdfScreen />} />
          <Route
            path="/pdf/organize/content"
            element={<OrganizePdfContentScreen />}
          />

          <Route path="/pdf/stamp" element={<StampPdfScreen />} />
          <Route
            path="/pdf/stamp/content"
            element={<StampPdfContentScreen />}
          />

          <Route path="/pdf/edit" element={<EditPdfScreen />} />
          <Route path="/pdf/edit/content" element={<EditPdfContentScreen />} />

          <Route path="/pdf/sign" element={<SignPdfScreen />} />
          <Route path="/pdf/sign/content" element={<SignPdfContentScreen />} />

          <Route path="/pdf/OCR/content" element={<OCRPdfContentScreen />} />
          <Route path="/pdf/OCR" element={<OCRPdfScreen />} />

          <Route path="/pdf/protect" element={<ProtectPdfScreen />} />
          <Route
            path="/pdf/protect/content"
            element={<ProtectPdfContentScreen />}
          />

          <Route path="/pdf/unlock" element={<UnlockPdfScreen />} />
          <Route
            path="/pdf/unlock/content"
            element={<UnlockPdfContentScreen />}
          />
          <Route path="/pdf/to/other" element={<PdfToOtherScreen />} />
          <Route
            path="/pdf/to/other/content"
            element={<PdfToOtherContentScreen />}
          />

          <Route path="/pdf/other/to/pdf" element={<OtherToPdfScreen />} />
          <Route
            path="/pdf/other/to/pdf/content"
            element={<OthersToPdfContentScreen />}
          />
          <Route path="/subscription" element={<SubscriptionPopup />} />
          <Route path="/select/payment" element={<PaymentPage />} />
          <Route
            path="/accounts/password_reset/confirm/"
            element={<ResetPassword />}
          />
          <Route path="/search-case" element={<SearchCaseScreen />} />
          <Route path="/search-case/:id" element={<SearchCaseSingleScreen />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </>
  );
};

export default Routers;
