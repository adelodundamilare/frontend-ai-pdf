// GoogleSignInButton.js
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleIcon from '../assets/google.svg';


const GoogleLoginButton = ({ onSuccess, onError }) => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        console.log('Authorization Code:', codeResponse.code);

        // Make a POST request to your backend to exchange the authorization code for access tokens
        const tokensResponse = await axios.post('http://127.0.0.1:8000/accounts/dj-rest-auth/google/login/', {
          code: codeResponse.code,
        });

        const token = tokensResponse.data;
        console.log('Access Tokens:', token);
        localStorage.setItem('token', token);

        // You can handle the obtained tokens as needed, such as saving them to state or local storage.
        if (onSuccess) {
          onSuccess(token);
        }
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        if (onError) {
          onError(error);
        }
      }
    },
    onError: (errorResponse) => console.log('Google Login Failed:', errorResponse),
  });

  return (
    <div>

             <div style={{ border: "1px solid #D9D9D9" }} className='flex items-center gap-4 p-2 w-[19rem] rounded-md mb-4 cursor-pointer'>
         <img src={GoogleIcon} alt="" />
        
         <button onClick={() => googleLogin()}>Continue  with Google</button>
       </div>
      {/* <h2>Google Login</h2>
      <button onClick={() => googleLogin()}>Sign in with Google</button> */}
    </div>
  );
};

export default GoogleLoginButton;
