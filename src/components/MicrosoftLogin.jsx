

import React, { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../Config';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../config/baseUrl';






const MicrosoftLogin = (props) => {
  const navigate = useNavigate();
  const { instance } = useMsal();

  const handleLogin = async (loginType) => {
    console.log('Clicked');
    if (loginType === 'popup') {
      try {
        const response = await instance.loginPopup(loginRequest);
        console.log('Response from loginPopup:', response);
        console.log('ID Token:', response.idToken);

        if (response.idToken) {
          const authorizationCode = response.accessToken;
          const tokensResponse = await axios.post(`${BASE_URL}/accounts/dj-rest-auth/microsoft/login/`, {
            access_token: response.accessToken,
            id_token: response.idToken,
          });

          const token = tokensResponse.data.key;
          console.log('Access Tokens:', token);
          localStorage.setItem('token', token);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error during loginPopup:', error);
      }
    } else if (loginType === 'redirect') {
      try {
        await instance.loginRedirect(loginRequest);
      } catch (error) {
        console.error('Error during loginRedirect:', error);
      }
    }
  };

    
  return (
    <>
    
            <button as="button" onClick={() => handleLogin("popup")}>Continue With Microsoft</button>
            {/* <button as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</button> */}
       
    </>
   
 
  );
};

export default MicrosoftLogin;
