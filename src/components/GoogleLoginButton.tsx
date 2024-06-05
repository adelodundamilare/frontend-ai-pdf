// GoogleSignInButton.js
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "../assets/google.svg";
import { BASE_URL } from "../config/baseUrl";
import { useNavigate } from "react-router-dom";
import ProgressModal from "./Progress";

const GoogleLoginButton = ({ onSuccess, onError }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        setLoading(true);
        // Make a POST request to your backend to exchange the authorization code for access tokens
        const tokensResponse = await axios.post(
          `${BASE_URL}/accounts/dj-rest-auth/google/login/`,
          {
            code: codeResponse.code,
          }
        );

        setLoading(false);

        const token = tokensResponse.data.token;
        localStorage.setItem("token", token);

        // You can handle the obtained tokens as needed, such as saving them to state or local storage.
        if (onSuccess) {
          onSuccess(token);
          // navigate("/dashboard");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error exchanging code for tokens:", error);
        navigate("/dashboard");
        if (onError) {
          onError(error);
        }
      }
    },
    onError: (errorResponse) =>
      console.log("Google Login Failed:", errorResponse),
  });

  if (loading) return <ProgressModal isLoading={loading} />;

  return (
    <div>
      <div
        style={{ border: "1px solid #D9D9D9" }}
        className="flex items-center gap-4 p-2 w-[19rem] rounded-md mb-4 cursor-pointer"
      >
        <img src={GoogleIcon} alt="" />

        <button onClick={() => googleLogin()}>Continue with Google</button>
      </div>
      {/* <h2>Google Login</h2>
      <button onClick={() => googleLogin()}>Sign in with Google</button> */}
    </div>
  );
};

export default GoogleLoginButton;
