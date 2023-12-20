

import React, { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../Config';
import { useNavigate } from 'react-router-dom'






const MicrosoftLogin = (props) => {
   // Replace with your actual Microsoft client ID
   
  
    const navigate = useNavigate(); 
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        console.log('Clicked')
        if (loginType === "popup") {
            console.log('Testing jjjj')
            instance
            .loginPopup(loginRequest)
            .then((response) => {
              console.log("Response from loginPopup:", response);
              console.log("ID Token:", response.idToken);
              // Handle the response as needed
              if(response.idToken){
                navigate('/dashboard');
              }

            })



            instance.loginPopup(loginRequest).catch(e => {
                // console.log(e);
                console.log(e, 'paras');
                console.log("e:", e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    
  return (
    <>
    
            <button as="button" onClick={() => handleLogin("popup")}>Continue With Microsoft</button>
            {/* <button as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</button> */}
       
    </>
   
 
  );
};

export default MicrosoftLogin;
