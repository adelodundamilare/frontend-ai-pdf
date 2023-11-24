import React, { useState } from 'react';
import CrossIcon from '../../../assets/cross.svg';
import GoogleIcon from '../../../assets/google.svg';
import MicrosoftIcon from '../../../assets/microsoft.svg';
import AppleIcon from '../../../assets/apple.svg';


const LoginAndRegistrationPopup = ({ setshowPopUp, isLogin, setisLogin, setisEmailPopup }) => {
  const [email, setEmail] = useState('');

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleContinue = async () => {

      // Continue with other actions (e.g., navigate to a new page)
      localStorage.setItem('enteredEmail', email);
      setisEmailPopup(true);
      setshowPopUp(false);}

  return (
    <div className='bg-white font-roboto p-3 rounded-md'>
      <img src={CrossIcon} alt="" className='float-right cursor-pointer' onClick={() => setshowPopUp(false)} />
      <h1 className='text-center text-xl'>{isLogin ? "Welcome Back" : "Create your account"}</h1>

      <div className='flex justify-center items-center flex-col mt-4'>
        {/* Other social login buttons */}
        <div style={{ border: "1px solid #D9D9D9" }} className='flex items-center gap-4 p-2 w-[19rem] rounded-md mb-4 cursor-pointer'>
          <img src={GoogleIcon} alt="" />
          <p>Continue With Google</p>
        </div>

        <div style={{ border: "1px solid #D9D9D9" }} className='flex items-center gap-4 p-2 w-[19rem] rounded-md mb-4 cursor-pointer'>
          <img src={AppleIcon} alt="" />
          <p>Continue With Apple</p>
        </div>

        <div style={{ border: "1px solid #D9D9D9" }} className='flex items-center gap-4 p-2 w-[19rem] rounded-md mb-4 cursor-pointer'>
          <img src={MicrosoftIcon} alt="" />
          <p>Continue With Microsoft Account</p>
        </div>
      </div>

      <div className='flex justify-center items-center gap-5 mb-2'>
        <div className='w-[20%] h-[1px] bg-[#D9D9D9]'></div>
        <p>OR</p>
        <div className='w-[20%] h-[1px] bg-[#D9D9D9]'></div>
      </div>

      <div className='flex justify-center items-center mb-2'>
        <input
          style={{ border: "1px solid #D9D9D9" }}
          type="text"
          placeholder='Email address'
          className='p-2 w-[19rem] placeholder:text-[#D9D9D9] rounded-md mb-4 outline-none'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='flex justify-center items-center mb-2' onClick={handleContinue}>
        <button className='p-2 w-[19rem] rounded-md text-white bg-[#20808D] tracking-wider'>{isLogin ? 'Continue' : 'Continue'}</button>
        
      </div>

      <div className='flex justify-center items-center'>
        <p className='text-black '>
          {isLogin ? "Don't have an Account" : "Already have an account"}{' '}
          <span className='text-[#20808D] ml-1 cursor-pointer' onClick={() => setisLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginAndRegistrationPopup;
