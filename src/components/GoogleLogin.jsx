// src/App.js

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleSignInButton from './GoogleSignInButton';
import GoogleLoginButton from "./GoogleLoginButton";

function GoogleLogin() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="28123279459-4cvinnj0ujpm46b97f1jecefh75jn876.apps.googleusercontent.com">
        <GoogleLoginButton />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleLogin;
