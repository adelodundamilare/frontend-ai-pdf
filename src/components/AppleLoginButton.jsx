import React, { useState } from 'react';
import AppleLogin from 'react-apple-login';

const AppleLoginButton = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = (response) => {
    // Handle the successful login response here
    console.log('Login Success:', response);
    setLoggedIn(true);
  };

  const handleLoginFailure = (error) => {
    // Handle the login failure here
    console.error('Login Failure:', error);
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <AppleLogin
          clientId="com.react.apple.login"
          redirectURI="https://redirectUrl.com"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          designProp={{
            type: 'continue', // Set the type to 'continue' for "Continue with Apple" text
            color: 'white',   // Set the background color to 'white'
          }}
          render={({ onClick }) => (
            <button
              onClick={onClick}
              style={{
                backgroundColor: 'white', // Set the background color to 'white'
                // padding: '10px', // Set padding or other styles as needed
                // Add any other custom styles as needed
              }}
            >
             Continue With Apple
            </button>
          )}
        />
      )}
    </div>
  );
};

export default AppleLoginButton;
