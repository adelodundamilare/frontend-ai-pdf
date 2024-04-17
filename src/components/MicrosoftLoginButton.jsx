import React, { useState, useRef } from "react";
import MicrosoftLogin from "react-microsoft-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MicrosoftLoginButton = () => {
  const navigate = useNavigate();
  const [msalInstance, onMsalInstanceChange] = useState();
  const YOUR_CLIENT_ID = import.meta.env.VITE_MICROSOFT_LOGIN_CLIENT_ID; // Replace with your actual Microsoft client ID
  const YOUR_CLIENT_SECRET = import.meta.env.VITE_MICROSOFT_LOGIN_CLIENT_SECRET;
  //   const url = 'http://localhost:5173/login-route';

  // const url = 'http://localhost:5173';
  const url = "https://ai-lawyer.neuracase.com";

  const loginHandler = async (err, response, data, msal) => {
    console.log("working");

    console.log(response);
    console.log(err, "err");

    // navigate('/dashboard');

    // // Some actions
    if (!err && response) {
      const authorizationCode = response.accessToken;
      const tokensResponse = await axios.post(
        "http://127.0.0.1:8000/accounts/dj-rest-auth/microsoft/login/",
        {
          access_token: response.accessToken,
          id_token: response.idToken,
        }
      );

      //   const tokens = tokensResponse.data;
      const token = tokensResponse.data.key;
      console.log("Access Tokens:", token);
      localStorage.setItem("token", token);
      onMsalInstanceChange(msal);
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <MicrosoftLogin
        clientId={YOUR_CLIENT_ID}
        authCallback={loginHandler}
        redirectUri={url}
        // client_secret = {YOUR_CLIENT_SECRET}
      >
        Continue with Microsoft
      </MicrosoftLogin>
    </div>
  );
};

export default MicrosoftLoginButton;
