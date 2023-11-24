import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '../../../../assets/send.svg'
import UploadIcon from '../../../../assets/upload.svg'
import './style.css'
import ProfileImage from '../../../../assets/profile.png'
import LikeIcon from '../../../../assets/like.svg'
import DisLikeIcon from '../../../../assets/dislike.svg'
import EditIcon from '../../../../assets/edit.svg'
import CopyIcon from '../../../../assets/copy.svg'
import QuestionIcon from '../../../../assets/question.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import Left from '../../LeftSide/Left'
import LoginAndRegistrationPopup from '../../../dynamic/Popup/LoginAndRegistrationPopup'
import EmailPopup from '../../../dynamic/Popup/EmailPopup'
import ForgotPopup from '../../../dynamic/Popup/ForgotPopup'
import SubscriptionPopup from '../../../dynamic/Popup/SubscriptionPopup'

const Chat = () => {

  const arr = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,]
  const chatContainer = useRef(null);
  const [showSideBar, setshowSideBar] = useState(false)
  const [showPopUp, setshowPopUp] = useState(false)
  const [isLogin, setisLogin] = useState(true)
  const [isEmailPopup, setisEmailPopup] = useState(false)
  const [isForgotPopup, setisForgotPopup] = useState(false)
  const [showSubscriptionPopup, setshowSubscriptionPopup] = useState(false)

  useEffect(() => {
    chatContainer.current?.scrollTo({
      top: chatContainer.current?.scrollHeight,
      behavior: 'smooth'
    });
  }, []);

  return (

    <div className='w-[100%] h-screen font-roboto pt-4 pb-4 pl-3 pr-3 lg:pl-[1rem] lg:pr-[1rem] relative overflow-x-hidden overflow-y-auto'>

      <div>
        {/* HAMBURGER MENU  */}
        <div className='block absolute top-3 left-4 lg:hidden'>
          <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setshowSideBar(!showSideBar)} />
        </div>

        {/* TOP BUTTON DEFAULT AND SUMMARIZER  */}
        <div className='flex justify-center items-center'>

          <div className='bg-[#D9D9D9] p-2 sm:w-[18rem] w-[14rem] rounded-md'>
            <button onClick={() => setshowPopUp(!showPopUp)} className='sm:w-[8rem] w-[6rem] h-[2.5rem] bg-white rounded-md mr-4'>Default</button>
            <button onClick={()=>setshowSubscriptionPopup(true)} className='sm:w-[8rem] w-[6rem] h-[2.5rem] bg-white rounded-md'>Summarizer</button>
          </div>

        </div>

        <div className='bg-[#D9D9D9] w-[100%] h-[1px] mt-3'></div>

        {/* MAIN CHAT SECTION  */}

        <div className=''>

          {/* Div For User And Ai Response  */}

          <div className='h-[60vh] pl-[2rem] pr-[2rem] overflow-y-auto scrollToBottom pb-[2rem] md:pb-[2rem]' ref={chatContainer}>
            {
              arr?.map((item, index) => {
                return (

                  <div key={index + 1}>
                    {/* USER QUERY  */}
                    <div className='flex gap-3 items-start mt-4 p-3'>
                      <img src={ProfileImage} alt="" className='w-[2rem] h-[2rem]' />
                      <p className='w-[90%] text-medium text-[#303030] h-fit overflow-y-auto max-h-[10rem] leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic cumque voluptatum cum nam sunt animi adipisci eius alias delectus incidunt dolorum fugit facilis, sed possimus? Deleniti quod eligendi officia eaque ipsum tenetur doloremque nihil placeat commodi aperiam? Assumenda excepturi repellat cupiditate dolores? Itaque rerum iure et quidem impedit ipsa velit!</p>
                      <img src={EditIcon} alt="" className='w-[1rem] h-[1rem] cursor-pointer' />
                    </div>

                    {/*Ai Response  */}
                    <div className='bg-[#F5F5F5] flex gap-3 items-start mt-4 p-3'>
                      <img src={ProfileImage} alt="" className='w-[2rem] h-[2rem]' />
                      <p className='w-[90%] text-medium text-[#303030] h-fit overflow-y-auto max-h-[10rem] leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic cumque voluptatum cum nam sunt animi adipisci eius alias delectus incidunt dolorum fugit facilis, sed possimus? Deleniti quod eligendi officia eaque </p>
                      <img src={CopyIcon} alt="" className='w-[1rem] h-[1rem] cursor-pointer' />
                      <img src={LikeIcon} alt="" className='w-[1rem] h-[1rem] cursor-pointer' />
                      <img src={DisLikeIcon} alt="" className='w-[1rem] h-[1rem] cursor-pointer' />

                    </div>
                  </div>
                )
              })
            }
          </div>

          {/* Div For Input  */}
          <div className='absolute bottom-[3rem] w-[100%]'>

            <div className='relative sm:w-[96%] w-[95%] flex justify-center items-center'>

              <textarea style={{ border: '1px solid #D9D9D9', maxHeight: '10rem' }} type="text" placeholder='[ Write a note ]' className='w-[100%]  h-fit min-w-fit relative resize-none pt-[1rem] pb-[1rem] pl-[2rem] pr-[5rem] text-lg tracking-wider  plaholder:text-[#303030] outline-none rounded-[1rem] shadow-ChatBoxShadown' onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} />
              <img src={SendIcon} alt="" className='absolute lg:right-[5%] right-[4rem]  top-[40%] cursor-pointer' />
              <img src={UploadIcon} alt="" className='absolute lg:right-[8%] right-[6rem] top-[40%] cursor-pointer' />

            </div>

          </div>

          {/* DIV FOR SMALL QUESTION MARK LOGO */}
          <div className='absolute bottom-[10px] float-right flex justify-end mr-[10rem] w-[96%]'>
            <div className='w-[1.3rem] h-[1.3rem] rounded-full flex justify-center items-center bg-[#36454F]'>
              <img src={QuestionIcon} alt="" />
            </div>
            {/* #36454F */}
          </div>


        </div>


      </div>

      {/* RESPONSIVE SIDE BAR COMPONENT  */}
      {
        showSideBar && (
          <div className='lg:hidden block absolute top-0 left-0'><Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} /></div>
        )
      }
      {
        showPopUp && (
          <div className=' absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50'>
            <div className=' w-[100%] h-[100%] flex justify-center items-center opacity-100'>
              <div className=' mt-auto mb-auto flex justify-center items-center opacity-100'>
                <LoginAndRegistrationPopup setshowPopUp={setshowPopUp} setisEmailPopup={setisEmailPopup} isLogin={isLogin} setisLogin={setisLogin} />
              </div>
            </div>
          </div>
        )
      }

      {
        isEmailPopup && (
          <div className=' absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50'>
            <div className=' w-[100%] h-[100%] flex justify-center items-center opacity-100'>
              <div className=' mt-auto mb-auto flex justify-center items-center opacity-100'>
                <EmailPopup setshowPopUp={setshowPopUp} setisForgotPopup={setisForgotPopup} setisEmailPopup={setisEmailPopup} isLogin={isLogin} setisLogin={setisLogin} />
              </div>
            </div>
          </div>
        )
      }

      {
        isForgotPopup && (
          <div className=' absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50'>
            <div className=' w-[100%] h-[100%] flex justify-center items-center opacity-100'>
              <div className=' mt-auto mb-auto flex justify-center items-center opacity-100'>
                <ForgotPopup setshowPopUp={setshowPopUp} setisForgotPopup={setisForgotPopup} setisEmailPopup={setisEmailPopup} />
              </div>
            </div>
          </div>
        )
      }
      {
        showSubscriptionPopup && (
          <div className=' absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50'>
            <div className=' w-[100%] h-[100%] flex justify-center items-center opacity-100'>
              <div className=' mt-auto mb-auto flex justify-center items-center opacity-100'>
                <SubscriptionPopup setshowSubscriptionPopup={setshowSubscriptionPopup} />
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default Chat