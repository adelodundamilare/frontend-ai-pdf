import React, { useEffect, useState } from 'react'
import ArrowImage from '../../../assets/arrow.svg'
import { useNavigate } from 'react-router-dom'
import { onBoardingData } from '../../../constants/onBoardingData'
import Logo from '../../../assets/logo.png'
import './style.css'
const OnBoarding = () => {
  const nav = useNavigate()
  const [onBoardingIndex, setonBoardingIndex] = useState(0)

  
  useEffect(() => {
    const interval = setInterval(() => {
      setonBoardingIndex((prevIndex) =>
        onBoardingData.length === prevIndex + 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [onBoardingIndex]);

  const currentData = onBoardingData[onBoardingIndex];
  return (

    <>
      <div className='md:flex block items-center font-roboto w-screen h-screen'>

        {/* LEFT SIDE  */}
        <div style={{ backgroundColor: onBoardingData[onBoardingIndex].color }} className={`flex-1 md:relative w-[100%] h-[100%] flex justify-center items-start flex-col p-4`}>

          {/* MAIN TITLE IF PRESENT  */}
          {
            onBoardingData[onBoardingIndex].mainHeading && (
              <div className='mb-3'>
                <h1 style={{ color: onBoardingData[onBoardingIndex].contentColor }} className='text-2xl onboarding-slide-enter'>{onBoardingData[onBoardingIndex].mainHeading}</h1>
              </div>
            )
          }

          {/* CIRCLE AND SUB TITLE  */}
          <div className='flex gap-3 items-center' key={currentData.subHeading}>
            <p style={{ color: onBoardingData[onBoardingIndex].contentColor }} className='text-xl'>{onBoardingData[onBoardingIndex].subHeading}</p>
            <div style={{ backgroundColor: onBoardingData[onBoardingIndex].contentColor }} className='w-[4rem] h-[4rem] onboarding-slide-enter  rounded-full'></div>
          </div>

          {/* DESCRIPTION  */}
          <div className='md:absolute bottom-10 mt-5'>
            <p style={{ color: onBoardingData[onBoardingIndex].contentColor }} className='w-[80%] onboarding-slide-enter'>{onBoardingData[onBoardingIndex].description}</p>
          </div>

          {/* BUTTON TRY NOW  RESPONSIVE  */}

          <div className='block md:hidden mt-4 w-[100%]'>
            <h1 className='text-2xl mb-10 font-semibold text-center'>AI Hub Tool</h1>
            <div className='flex justify-center items-center'>
              <button onClick={() => nav("/login-route")} style={{ border: "2px solid #20808D " }} className='w-[18rem] h-[2.8rem] font-bold tracking-wide bg-transparent rounded-md text-[#20808D] flex justify-center items-center gap-3'>Try Now For Free
                <img src={ArrowImage} alt="arrow-image" loading='true' />
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE  */}

        <div className='flex-1  hidden w-[100%] h-[100%] md:flex justify-center items-center flex-col'>
          <img src={Logo} className='h-[2rem] mb-3'/>
          <button onClick={() => nav("/login-route")} style={{ border: "2px solid #20808D " }} className='w-[18rem] hover:bg-[#20808D] hover:text-white h-[2.8rem] font-bold tracking-wide bg-transparent rounded-md text-[#20808D] flex justify-center items-center gap-3'>Try Now For Free
            <img src={ArrowImage} alt="arrow-image" loading='true' />
          </button>
        </div>


      </div>
    </>
  )
}

export default OnBoarding