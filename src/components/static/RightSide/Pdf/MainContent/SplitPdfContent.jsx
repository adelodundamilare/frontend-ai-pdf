import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Left from '../../../LeftSide/Left'
import BackIcon from '../../../../../assets/back.svg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCopy } from "react-icons/fa";
import DeviceIcon from '../../../../../assets/device.svg'
import DropBoxIcon from '../../../../../assets/dropbox.svg'
import RangeIcon from '../../../../../assets/range.svg'
import PagesIcon from '../../../../../assets/pages.svg'
import { AiOutlinePlus } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'

const SplitPdfContent = () => {

    const [showSideBar, setshowSideBar] = useState(false)
    const [showLeftSideBar, setshowLeftSideBar] = useState(false)
    const nav = useNavigate()

    return (
        <div className='relative h-[100vh] overflow-y-auto'>
            {/* HUMBURGER MENU  */}
            <div className='ml-3 md:hidden block pt-3'>
                <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setshowSideBar(!showSideBar)} />
            </div>

            <div className='flex justify-between h-[95%] overflow-y-auto overflow-x-hidden font-roboto'>

                <div className='flex-1 relative'>

                    <div className='flex gap-3 cursor-pointer p-3 h-fit' onClick={() => nav("/pdf/compress")}>
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

                    <div className='flex mt-10 justify-center items-center gap-2 absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>

                        <div className='sm:w-[13rem] w-[10rem] h-[15rem] rounded-[0.5rem] overflow-y-auto bg-gray-100'>
                            <p className='text-sm m-4 bg-white p-3 h-[13rem] overflow-y-auto'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt ut quod dicta cum numquam adipisci rem odit. Corrupti sed quidem id esse beatae dolor facere eaque cupiditate, recusandae, perferendis.</p>
                        </div>

                        <div className='sm:w-[13rem] w-[10rem] h-[15rem] rounded-[0.5rem] overflow-y-auto bg-gray-100'>
                            <p className='text-sm m-4 bg-white p-3 h-[13rem] overflow-y-auto'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt ut quod dicta cum numquam adipisci rem odit. Corrupti sed quidem id esse beatae dolor facere eaque cupiditate, recusandae, perferendis.</p>
                        </div>
                    </div>


                </div>


                <div className='w-[18rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative'>

                    <div className='flex justify-center items-center flex-col'>
                        <p className='text-lg text-center pl-4 pr-4'>Split PDF</p>
                    </div>

                    <div className='w-[100%] pr-2'>

                        <div className='flex gap-2 mt-3'>
                            <div style={{ border: "1px solid #D9D9D9" }} className='w-[50%] p-2 flex justify-center items-center flex-col '>
                                <img src={RangeIcon} alt="" />
                                <p className='text-sm mt-2'>Split by range</p>
                            </div>
                            <div className='w-[50%] p-2 flex justify-center items-center flex-col'>
                                <img src={PagesIcon} alt="" />
                                <p className='text-sm mt-2'>Extract by pages</p>
                            </div>
                        </div>

                    </div>

                    <div className='w-[100%] pr-2 pl-2 mt-4'>
                        <p className='tex-[#474747] mb-2'>Range Mode:</p>

                        <div className='flex justify-between items-center'>

                            <div className='w-[45%]'>
                                <button style={{ border: "1px solid #20808d" }} className='text-[#20808d] w-[100%] h-[2.6rem] rounded-[0.375rem]'>Custom</button>
                            </div>

                            <div className='w-[45%]'>
                                <button className='bg-[#F4F4F4] w-[100%] h-[2.6rem] rounded-[0.375rem]'>Fixed</button>
                            </div>
                        </div>

                    </div>

                    <div className='w-[100%] pr-2 pl-2 mt-4'>

                        <p className='tex-[#474747] mb-2'>Range Mode:</p>

                        <div className='flex justify-between gap-x-2 items-center'>

                            <div className='w-[50%]'>

                                <div style={{ border: "1px solid black" }} className='w-[100%] h-[3rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1'>
                                    <p className='text-sm'>from page</p>
                                    <div className='w-[1px] h-[100%] bg-black'></div>
                                    <input type='number'className='text-sm w-[40%] outline-none'/>
                                </div>

                            </div>

                            <div className='w-[50%]'>

                                <div style={{ border: "1px solid black" }} className='w-[100%] h-[3rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1'>
                                    <p className='text-sm'>to</p>
                                    <div className='w-[1px] h-[100%] bg-black'></div>
                                    <input type='number'className='text-sm w-[40%] outline-none'/>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='mt-[2rem]'>
                        <button style={{ border: "1px solid #20808D" }} className='text-[#20808D] rounded-md p-2 flex justify-center items-center gap-2'><AiOutlinePlus className='text-[#20808D]' />Add range</button>
                    </div>

                    <div className='mt-[1rem]'>
                        <p className='text-center text-[#474747]'>Merge all ranges in one PDF file</p>
                    </div>


                    <div className=' absolute bottom-3 flex justify-center items-center'>
                        <button className='bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md'>Compress PDF</button>
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

                        <div className='w-[18rem] h-[100vh] bg-white md:hidden shadow-CardShadow absolute top-0 right-0 p-4 flex justify-start items-center flex-col'>

                            <div className='w-[100%] mb-4 cursor-pointer' onClick={() => setshowLeftSideBar(false)}>
                                <ImCross className='float-right' onClick={() => setshowLeftSideBar(false)} />
                            </div>

                            <div className='flex justify-center items-center flex-col'>
                                <p className='text-lg text-center pl-4 pr-4'>Split PDF</p>
                            </div>

                            <div className='w-[100%] pr-2'>

                                <div className='flex gap-2 mt-3'>
                                    <div style={{ border: "1px solid #D9D9D9" }} className='w-[50%] p-2 flex justify-center items-center flex-col '>
                                        <img src={RangeIcon} alt="" />
                                        <p className='text-sm mt-2'>Split by range</p>
                                    </div>
                                    <div className='w-[50%] p-2 flex justify-center items-center flex-col'>
                                        <img src={PagesIcon} alt="" />
                                        <p className='text-sm mt-2'>Extract by pages</p>
                                    </div>
                                </div>

                            </div>

                            <div className='w-[100%] pr-2 pl-2 mt-4'>
                                <p className='tex-[#474747] mb-2'>Range Mode:</p>

                                <div className='flex justify-between items-center'>

                                    <div className='w-[45%]'>
                                        <button style={{ border: "1px solid #20808d" }} className='text-[#20808d] w-[100%] h-[2.6rem] rounded-[0.375rem]'>Custom</button>
                                    </div>

                                    <div className='w-[45%]'>
                                        <button className='bg-[#F4F4F4] w-[100%] h-[2.6rem] rounded-[0.375rem]'>Fixed</button>
                                    </div>
                                </div>

                            </div>

                            <div className='w-[100%] pr-2 pl-2 mt-4'>

                                <p className='tex-[#474747] mb-2'>Range Mode:</p>

                                <div className='flex justify-between gap-x-2 items-center'>

                                    <div className='w-[50%]'>

                                        <div style={{ border: "1px solid black" }} className='w-[100%] h-[3rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1'>
                                            <p className='text-sm'>from page</p>
                                            <div className='w-[1px] h-[100%] bg-black'></div>
                                            <p className='text-sm'>1</p>
                                        </div>

                                    </div>

                                    <div className='w-[50%]'>

                                        <div style={{ border: "1px solid black" }} className='w-[100%] h-[3rem] rounded-[0.375rem] flex gap-3 items-center pl-1 pr-1'>
                                            <p className='text-sm'>to</p>
                                            <div className='w-[1px] h-[100%] bg-black'></div>
                                            <p className='text-sm'>2</p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className='mt-[2rem]'>
                                <button style={{ border: "1px solid #20808D" }} className='text-[#20808D] rounded-md p-2 flex justify-center items-center gap-2'><AiOutlinePlus className='text-[#20808D]' />Add range</button>
                            </div>

                            <div className='mt-[1rem]'>
                                <p className='text-center text-[#474747]'>Merge all ranges in one PDF file</p>
                            </div>

                            <div className=' absolute bottom-3 flex justify-center items-center'>
                                <button className='bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md'>Merge PDF</button>
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

export default SplitPdfContent
