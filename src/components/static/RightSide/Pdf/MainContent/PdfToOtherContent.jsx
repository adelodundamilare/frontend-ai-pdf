import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Left from '../../../LeftSide/Left'
import BackIcon from '../../../../../assets/back.svg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCopy } from "react-icons/fa";
import DeviceIcon from '../../../../../assets/device.svg'
import DropBoxIcon from '../../../../../assets/dropbox.svg'
import { AiOutlineArrowDown, AiOutlinePlus } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'


const PdfToOtherContent = () => {

    const [showSideBar, setshowSideBar] = useState(false)
    const [showLeftSideBar, setshowLeftSideBar] = useState(false)
    const nav = useNavigate()

    return (
        <div className='relative overflow-y-hidden'>

            {/* HUMBURGER MENU  */}
            <div className='ml-3 md:hidden block pt-3'>
                <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setshowSideBar(!showSideBar)} />
            </div>

            <div className='flex justify-between h-[95vh] overflow-y-hidden overflow-x-hidden font-roboto'>

                <div className='flex-1 relative'>

                    <div className='flex gap-3 cursor-pointer p-3 h-fit' onClick={() => nav("/pdf/to/other")}>
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
                        <p className='text-lg text-center'>Convert to Other File format</p>
                        <p className='text-sm text-center  mt-3 text-[#303030]'>Choose file type to convert your PDF into.</p>
                    </div>

                    <div className='mt-4 w-[100%] pl-2 pr-2'>
                        <p className='ml-0'>Choose file:</p>
                        <div style={{ border: "1px solid #D9D9D9" }} className='w-[100%] p-3 flex justify-between items-center rounded-md cursor-pointer mt-2'>
                            <p>DOC</p>
                            <AiOutlineArrowDown />
                        </div>
                    </div>


                    <div className=' absolute bottom-3 flex justify-center items-center'>
                        <button className='bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md'>Convert</button>
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

                        <div className='w-[13rem] h-[100vh] bg-white md:hidden shadow-CardShadow absolute top-0 right-0 pt-4 pb-4 flex justify-start items-center flex-col'>

                            <div className='w-[100%] mb-4 cursor-pointer pr-2' onClick={() => setshowLeftSideBar(false)}>
                                <ImCross className='float-right' onClick={() => setshowLeftSideBar(false)} />
                            </div>

                            <div className='flex justify-center items-center flex-col'>
                                <p className='text-lg text-center'>Convert to Other File format</p>
                                <p className='text-sm text-center  mt-3 text-[#303030]'>Choose file type to convert your PDF into.</p>
                            </div>

                            <div className='mt-4 w-[100%] pl-2 pr-2'>
                                <p className='ml-0'>Choose file:</p>
                                <div style={{ border: "1px solid #D9D9D9" }} className='w-[100%] p-3 flex justify-between items-center rounded-md cursor-pointer mt-2'>
                                    <p>DOC</p>
                                    <AiOutlineArrowDown />
                                </div>
                            </div>


                            <div className='absolute bottom-3 flex justify-center items-center'>
                                <button className='bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md'>Convert</button>
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

export default PdfToOtherContent
