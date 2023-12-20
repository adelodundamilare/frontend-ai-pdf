import React, { useState, useRef } from "react";
import MicrosoftLogin from 'react-microsoft-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const MicrosoftLoginButton = () => {

  const navigate = useNavigate(); 
  const [msalInstance, onMsalInstanceChange] = useState();
  const YOUR_CLIENT_ID = '7ef6bc24-cbd7-4e47-b874-e9c417da13d6'; // Replace with your actual Microsoft client ID
  const YOUR_CLIENT_SECRET  = '-Y48Q~Z.xujVkRw8GqEuxy-p5b5kENybY~mJDcj2'
//   const url = 'http://localhost:5173/login-route';
// parasApp;0c9544f9-5424-4e23-b742-bbe5879e0416
// chatgpt:0ffbd016-485a-463c-a606-537c0852954f
// DjangoAppSSO:7ef6bc24-cbd7-4e47-b874-e9c417da13d6
// client_secret:-Y48Q~Z.xujVkRw8GqEuxy-p5b5kENybY~mJDcj2
  const url = 'http://localhost:5173';


  

  const loginHandler =  async (err, response, data, msal) => {
    console.log("working");

    console.log(response, )
    console.log(err, 'err')

   
    // navigate('/dashboard');

    // // Some actions
    // if (!err && response) {
    //   const authorizationCode = response.accessToken;
    //   const tokensResponse = await axios.post('http://127.0.0.1:8000/accounts/dj-rest-auth/microsoft/login/', {
    //     access_token: response.accessToken,
    //     id_token: response.idToken,
    //   });

    // //   const tokens = tokensResponse.data;
    //   const token = tokensResponse.data;
    //   console.log('Access Tokens:', token);
    //   localStorage.setItem('token', token);
    //   onMsalInstanceChange(msal);
    //   navigate('/dashboard');
    // }
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
