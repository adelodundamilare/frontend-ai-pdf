import React from 'react';
import AppleSignin from 'react-apple-signin-auth';
import { BASE_URL } from '../config/baseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../App.css'


const AppleLoginButton = () => {
  const nav = useNavigate()
  const handleSignInSuccess = async (response) => {
    console.log('Sign-in successful:', response);

    const code = response.authorization.code;
    


    // const client_id = 'com.lawtabby.pdf.sid'; // Replace with your actual client ID
    const client_secret = 'W63JQDWXV8'; // Replace with your actual client secret
    


    // nav('/dashboard');



    // try {
      // Extract the authorization code from the response


    
      
      console.log(code, 'code')

      // Make a POST request to your backend to exchange the authorization code for access tokens
      const tokensResponse = await axios.post(`${BASE_URL}/accounts/dj-rest-auth/apple/login/`, {
        code: code,
        id_token:response.authorization.id_token,
      });


      

      const token = tokensResponse.data.key;
      console.log('Access Tokens:', token);
      localStorage.setItem('token', token);

      nav('/dashboard');

      


      // Handle the token response as needed (e.g., store tokens, set user as logged in, etc.)
    // } catch (error) {
    //   console.error('Error exchanging Apple code for tokens:', error);
    //   // Handle the error as needed
    // }
  };

  const handleSignInError = (error) => {
    console.error('Sign-in error:', error);
    // Handle sign-in error here
  };

  return (
    <div>
      <AppleSignin
        authOptions={{
          clientId: 'com.lawtabby.pdf.sid', // Replace with your actual client ID
          scope: 'email name', // Requested scopes
          redirectURI: 'https://ai-lawyer.neuracase.com', // Your redirect URI
          state: 'state',
          nonce: 'nonce',
          usePopup: true, // Use popup authentication
        }}
        onSuccess={handleSignInSuccess}
        // onSuccess={(response) => console.log(response, 'paras')}
        onError={handleSignInError}
        className="react-apple-signin-auth-btn-dark" 
        // uiType="dark"
        // className="apple-auth-btn"
        // buttonExtraChildren="Continue with Apple"
      >
      Continue with Apple
     </AppleSignin>
    </div>
  );
};

export default AppleLoginButton;





