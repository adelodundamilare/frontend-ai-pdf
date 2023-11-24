import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Left from '../../../LeftSide/Left'
import BackIcon from '../../../../../assets/back.svg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCopy } from "react-icons/fa";
import DeviceIcon from '../../../../../assets/device.svg'
import DropBoxIcon from '../../../../../assets/dropbox.svg'
import { AiOutlinePlus } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'

const SignPdfContent = () => {

    const [showSideBar, setshowSideBar] = useState(false)
    const [showLeftSideBar, setshowLeftSideBar] = useState(false)
    const nav = useNavigate()

    return (
        <div className='relative'>

            {/* HUMBURGER MENU  */}
            <div className='ml-3 md:hidden block pt-3'>
                <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setshowSideBar(!showSideBar)} />
            </div>

            <div className='flex justify-between h-[100vh] overflow-y-auto overflow-x-hidden font-roboto'>

                <div className='flex-1 relative'>

                    <div className='flex gap-3 cursor-pointer p-3 h-fit' onClick={() => nav("/pdf/sign")}>
                        <img src={BackIcon} alt="" />
                        <p>Back</p>
                    </div>

                    <div className='absolute right-2'>

                        <div className='w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer'>
                            <AiOutlinePlus alt="" className=' text-white' />
                        </div>

                        <div className='w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer'>
                            <FaCopy alt="" className=' text-white' />
                        </div>

                        <div className='w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer'>
                            <img src={DeviceIcon} alt="" />
                        </div>

                        <div className='w-[2rem] h-[2rem] rounded-[0.375rem] bg-[#20808d] flex justify-center items-center mb-2 cursor-pointer'>
                            <img src={DropBoxIcon} alt="" />
                        </div>

                    </div>

                    <div className='flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>

                        <div className='w-[15rem] rounded-[0.5rem] bg-gray-100'>
                            <p className='text-sm m-4 bg-white p-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt ut quod dicta cum numquam adipisci rem odit. Corrupti sed quidem id esse beatae dolor facere eaque cupiditate, recusandae, perferendis placeat in impedit obcaecati, voluptatum ullam temporibus fugit. Error unde sapiente illo maxime cupiditate, porro exercitationem suscipit, amet quasi iste ut.</p>
                        </div>
                    </div>


                </div>


                <div className='w-[13rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative'>

                    <div className='flex justify-center items-center flex-col'>
                        <p className='text-lg text-center pl-4 pr-4'>Sign Pdf </p>
                    </div>

                    <div className='w-[100%] pr-2 pl-2 mt-4 cursor-pointer'>
                        <p className='tex-[#474747] mb-2'>Type:</p>
                        <p style={{ border: "1px solid black" }} type="text" name="" placeholder='Enter Text' className='w-[100%] h-[2.7rem] font-mono flex justify-center items-center rounded-[0.375rem]'>Wole Michoel</p>
                    </div>

                    <div className=' absolute bottom-3 flex justify-center items-center'>
                        <button className='bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md'>Sign Pdf</button>
                    </div>

                </div>

                {
                    !showLeftSideBar && (
                        <div className='md:hidden block p-3 absolute top-0 right-0' onClick={() => setshowLeftSideBar(true)}>
                            <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setshowLeftSideBar(true)} />
                        </div>
                    )
                }

                {
                    // reponsive side bar 
                    showLeftSideBar && (

                        <div className='w-[13rem] h-[100vh] bg-white md:hidden shadow-CardShadow absolute top-0 right-0 p-4 flex justify-start items-center flex-col'>

                            <div className='w-[100%] mb-4 cursor-pointer' onClick={() => setshowLeftSideBar(false)}>
                                <ImCross className='float-right' onClick={() => setshowLeftSideBar(false)} />
                            </div>

                            <div className='flex justify-center items-center flex-col'>
                                <p className='text-lg text-center pl-4 pr-4'>Sign Pdf</p>
                            </div>

                            <div className='w-[100%] pr-2 pl-2 mt-4 cursor-pointer'>
                                <p className='tex-[#474747] mb-2'>Type:</p>
                                <p style={{ border: "1px solid black" }} type="text" name="" placeholder='Enter Text' className='w-[100%] h-[2.7rem] font-mono flex justify-center items-center rounded-[0.375rem]'>Wole Michoel</p>
                            </div>

                            <div className=' absolute bottom-3 flex justify-center items-center'>
                                <button className='bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md'>Sign Pdf</button>
                            </div>


                        </div>
                    )
                }

            </div>

            {
                showSideBar && (
                    <div className='lg:hidden block absolute top-0 left-0'><Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} /></div>
                )
            }
        </div>
    )
}

export default SignPdfContent
