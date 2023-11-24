import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Left from '../../../LeftSide/Left'
import BackIcon from '../../../../../assets/back.svg'
import { GiHamburgerMenu } from 'react-icons/gi'
import UpIcon from '../../../../../assets/up.svg'
import DownIcon from '../../../../../assets/down.svg'
import SquareIcon from '../../../../../assets/square1.svg'
import Stretch from '../../../../../assets/stretch.svg'
import ZommoutIcon from '../../../../../assets/zoomout.svg'
import ZomminIcon from '../../../../../assets/zoomin.svg'
import AiIcon from '../../../../../assets/ai.svg'
import GalleryIcon from '../../../../../assets/gallery1.svg'
import PencilIcon from '../../../../../assets/pencil.svg'
import ShapeIcon from '../../../../../assets/shape.svg'
import PDF from '../../../../../assets/pdf1.png'


import { ImCross } from 'react-icons/im'

const EditPdfContent = () => {
    const [showSideBar, setshowSideBar] = useState(false)
    const [showLeftSideBar, setshowLeftSideBar] = useState(false)
    const nav = useNavigate()

    return (
        <div className='relative overflow-y-hidden'>
            {/* HUMBURGER MENU  */}
            <div className='ml-3 md:hidden block pt-3'>
                <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setshowSideBar(!showSideBar)} />
            </div>

            <div className='flex justify-between h-[100vh] overflow-y-auto overflow-x-hidden font-roboto'>

                <div className='flex-1 relative'>

                    <div className='flex overflow-x-auto gap-4 items-center shadow-ChatBoxShadown p-[1.3px]'>

                        <div className='flex gap-3 cursor-pointer p-3 h-fit' onClick={() => nav("/pdf/edit")}>
                            <img src={BackIcon} alt="" />
                            <p>Back</p>
                        </div>

                        <div className='flex gap-2 mr-4 items-center'>
                            <img src={UpIcon} alt=""  className='cursor-pointer'/>
                            <img src={DownIcon} alt="" className='cursor-pointer' />
                            <input style={{border:"1px solid #ADADB6"}} type="number" className=' h-[2rem] w-[4rem] pl-2 rounded-md outline-none' />
                            <p className='sm:mr-0 mr-10'>/3</p>
                        </div>

                        <div className='flex gap-x-6 items-center'>
                            <img src={SquareIcon} alt=""  className='cursor-pointer'/>
                            <img src={ZommoutIcon} alt="" className='cursor-pointer' />
                            <img src={ZomminIcon} alt="" className='cursor-pointer' />
                            <img src={Stretch} alt="" className='cursor-pointer' />
                            <img src={AiIcon} alt="" className='cursor-pointer' />
                            <img src={GalleryIcon} alt="" className='cursor-pointer' />
                            <img src={PencilIcon} alt="" className='cursor-pointer' />
                            <img src={ShapeIcon} alt="" className='cursor-pointer' />
                        </div>


                    </div>

                    {/* MAIN  */}

                    <div className='flex'>

                        <div className='sm:w-[12rem] w-[5rem] h-[91vh] bg-[#F4F4F4] overflow-y-auto flex justify-start items-center flex-col'>
                            <img src={PDF} alt="" className='w-[5rem] h-[5rem] sm:w-[10rem] sm:h-[10rem] mt-3 mb-3 cursor-pointer' />
                            <img src={PDF} alt="" className='w-[5rem] h-[5rem] sm:w-[10rem] sm:h-[10rem] mt-3 mb-3 cursor-pointer' />
                            <img src={PDF} alt="" className='w-[5rem] h-[5rem] sm:w-[10rem] sm:h-[10rem] mt-3 mb-3 cursor-pointer' />
                            <img src={PDF} alt="" className='w-[5rem] h-[5rem] sm:w-[10rem] sm:h-[10rem] mt-3 mb-3 cursor-pointer' />
                            <img src={PDF} alt="" className='w-[5rem] h-[5rem] sm:w-[10rem] sm:h-[10rem] mt-3 mb-3 cursor-pointer' />
                        </div>

                        <div className=' bg-[#E1E1E1] h-[91vh] w-[5px]  sm:w-[10px]'></div>

                        <div className='flex-1 bg-[#F4F4F4] h-[91vh] p-3 overflow-y-auto flex justify-center items-center'>
                            <img src={PDF} alt="" className='bg-contain mt-3 mb-3' />
                        </div>
                    </div>



                </div>


                <div className='w-[10rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative'>

                    <div className='flex justify-center items-center flex-col'>
                        <p className='text-lg text-center pl-4 pr-4'>Edit PDF</p>
                        <div className='bg-[#D9D9D9] w-[10rem] h-[1px] mt-2 mb-2'></div>
                    </div>


                    <div className=' absolute bottom-3 flex justify-center items-center'>
                        <button className='bg-[#20808D] text-white w-[8rem] h-[2.5rem] rounded-md'>Edit PDF</button>
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

                        <div className='w-[14rem] h-[100vh] bg-white md:hidden shadow-CardShadow absolute top-0 right-0 p-4 flex justify-start items-center flex-col'>

                            <div className='w-[100%] mb-4 cursor-pointer' onClick={() => setshowLeftSideBar(false)}>
                                <ImCross className='float-right' onClick={() => setshowLeftSideBar(false)} />
                            </div>

                            <div className='flex justify-center items-center flex-col'>
                                <p className='text-lg text-center pl-4 pr-4'>Edit PDF</p>
                                <div className='bg-[#D9D9D9] w-[10rem] h-[1px] mt-2 mb-2'></div>
                            </div>


                            <div className=' absolute bottom-3 flex justify-center items-center'>
                                <button className='bg-[#20808D] text-white w-[8rem] h-[2.5rem] rounded-md'>Edit PDF</button>
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

export default EditPdfContent
