import React from 'react'
import CrossIcon from '../../../assets/cross.svg'

const ForgotPopup = ({setisEmailPopup,setisForgotPopup}) => {
  return (
    <div className=' bg-white w-fit font-roboto p-3 rounded-md'>

      <img src={CrossIcon} alt="" srcset="" className=' float-right cursor-pointer' onClick={() => setisForgotPopup(false)} />
      <h1 className='text-center text-xl'>Reset your password</h1>

      <div className='flex justify-center items-center mt-2'>
        <p className='text-[#20808D] text-center w-[20rem] '>Enter your email address and we will send you instruction to reset your password.</p>
      </div>


      <div className='flex justify-center items-center mb-2 flex-col mt-4'>
        <input style={{ border: "1px solid #D9D9D9" }} type="text" placeholder='Email address' className='p-2 w-[19rem] placeholder:text-[#D9D9D9] rounded-md mb-4 outline-none' />
      </div>


      <div  className='flex justify-center items-center mb-2'>
        <button className='p-2 w-[19rem] rounded-md text-white bg-[#20808D] tracking-wider'>Continue</button>
      </div>

      <div className='flex justify-center items-center'>
        <span className='text-[#20808D] cursor-pointer' onClick={()=>{setisEmailPopup(true),setisForgotPopup(false)}}>Back to Sign in</span>
      </div>

    </div>)
}

export default ForgotPopup