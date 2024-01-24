import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrossIcon from '../../../assets/cross.svg';
import { BASE_URL } from '../../../config/baseUrl';
import { toast } from 'react-toastify';
import ForgotPopup from './ForgotPopup';
import { useNavigate } from 'react-router-dom'



const EmailPopup = ({ isForgotPopup, isLogin, setisLogin, setisForgotPopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  const handleContinue = async () => {
    try {
      const endpoint = isLogin ? 'accounts/login/' : 'accounts/register/';
      const response = await axios.post(`${BASE_URL}/${endpoint}`, {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      if (!isLogin) {
        setisLogin(true);
      } else {
        console.log('Working 22222');
      }

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      isLogin && navigateTo('/dashboard');
    } catch (error) {
      const errorMessage = isLogin
        ? 'Something is wrong with email or password'
        : 'Email already exists';

      console.error(errorMessage, error.message);

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    // Retrieve email from local storage on component mount
    const storedEmail = localStorage.getItem('enteredEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
 
  }, [setEmail]);

  const handleChildUpdate = (val) => {
    setisForgotPopup(val);
  };

  return (
    <>
    {isForgotPopup?
  <ForgotPopup shouldUpdate={handleChildUpdate}/> : 
  <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>

  <div className='bg-white font-roboto p-3 rounded-md'>
 

    {/* <img src={CrossIcon} alt="" className='float-right cursor-pointer' onClick={() => setisEmailPopup(false)} /> */}
    <h1 className='text-center text-xl'>{isLogin ? "Enter your password" : "Create Your Account"}</h1>

    <div className='flex justify-center items-center mb-2 flex-col mt-4'>
      <input
        style={{ border: "1px solid #D9D9D9" }}
        type="text"
        placeholder='Email address'
        className='p-2 w-[19rem] placeholder:text-[#D9D9D9] rounded-md mb-4 outline-none'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ border: "1px solid #D9D9D9" }}
        type="password"
        placeholder='Enter password'
        className='p-2 w-[19rem] placeholder:text-[#D9D9D9] rounded-md outline-none'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    {isLogin && (
      <div onClick={() => { setisForgotPopup(true)}}>
        <p className='text-[#20808D] mb-2 text-sm font-bold cursor-pointer'>Forgot password?</p>
      </div>
    )}

    <div style={{ marginTop: !isLogin && "1rem" }} className='flex justify-center items-center mb-2' onClick={handleContinue}>
      <button className='p-2 w-[19rem] rounded-md text-white bg-[#20808D] tracking-wider'>Continue</button>
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
  </div>
  }
    </>
 

  );
}

export default EmailPopup;
