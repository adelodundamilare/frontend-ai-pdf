// src/App.js

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleSignInButton from './GoogleSignInButton';
import GoogleLoginButton from "./GoogleLoginButton";

function GoogleLogin() {
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  return (
    <div className="App">
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID}
      >
        <GoogleLoginButton onSuccess={responseMessage} onError={errorMessage} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleLogin;
