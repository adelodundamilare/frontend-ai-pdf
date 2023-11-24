import React, { useState } from 'react'
import Left from '../../static/LeftSide/Left'
import { GiHamburgerMenu } from 'react-icons/gi'
import DocImage from '../../../assets/doc.png'
import PdfImage from '../../../assets/pdf.png'
import GalleryImage from '../../../assets/gallery.svg'
import ListImage from '../../../assets/list.svg'
import DotImage from '../../../assets/dot.svg'
import TrashImage from '../../../assets/trash.svg'
import EditImage from '../../../assets/edit.svg'
import { CiEdit, CiTrash } from "react-icons/ci";


const UploadAndDownloadPdf = ({ title }) => {

  const [showSideBar, setshowSideBar] = useState(false)
  const arr = [1, 2, 3, 4, 5]
  const [showPopup, setshowPopup] = useState({ show: false, id: null })
  const [verticalView, setverticalView] = useState(true)

  return (
    <div className='w-[100%] h-screen overflow-y-auto overflow-x-hidden font-roboto'>
      {/* RESPONSIVE CODE FOR HAMBURGER  */}
      <div className='ml-3 mt-3 lg:hidden block'>
        <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setshowSideBar(!showSideBar)} />
      </div>

      {/* MAIN COMPONENT  */}
      <div className='h-[100%] w-[100%] pt-5 pb-5'>

        {/* MAIN HEADING  */}
        <div className='flex justify-center items-center flex-col'>
          <h1 className='text-2xl'>{title}</h1>
          <p className='text-[#505050] mt-2'>Access your uploaded file history</p>
        </div>

        {/* CHANGE UI STYLE ORDER ICONS */}
        <div className='flex justify-end gap-x-4 w-[100%] pr-5 sm:mb-0 mb-3'>

          <div onClick={() => setverticalView(true)} className='w-[2rem] h-[2rem] cursor-pointer rounded-md bg-[#D9d9d9] flex justify-center items-center'>
            <img src={GalleryImage} alt="" />
          </div>

          <div onClick={() => setverticalView(false)} className='w-[2rem] h-[2rem] cursor-pointer rounded-md bg-[#D9d9d9] flex justify-center items-center'>
            <img src={ListImage} alt="" />
          </div>

        </div>

        {/* MAIN PDF CONTENT  */}
        {
          verticalView ?
            <div className='flex justify-center items-center flex-wrap mt-3  md:ml-[5rem] sm:ml-[3.5rem] ml-0'>

              <div className='flex w-[80%] justify-start items-center flex-wrap gap-2'>

                {
                  arr.map((item, index) => {
                    return (
                      <div key={index} style={{ border: "1px solid #d9d9d9" }} className='sm:w-[15rem] relative w-[100%] mb-2 sm:mb-0 h-[12rem] rounded-md shadow-CardShadow p-3'>

                        <div className='flex justify-end'>
                          <div style={{ border: "1px solid #d9d9d9" }} onClick={() => setshowPopup({ show:showPopup.id===item?false:true, id: item })} className='w-[3rem] h-[1.2rem] cursor-pointer rounded-lg flex justify-center items-center'>
                            <img src={DotImage} alt="" />
                          </div>
                        </div>

                        <div className='flex justify-center items-center'>
                          <img src={index % 2 != 0 ? PdfImage : DocImage} alt="" />
                        </div>

                        <div className='flex justify-center items-center mt-4'>
                          <p className='text-[#303030]'>Court plead</p>
                        </div>

                        {
                          showPopup.show === true && showPopup.id === item ?
                            <div className='bg-[#D9D9D9] absolute top-10 h-[7rem] right-2 w-[10rem] rounded-lg flex justify-center items-center flex-col'>
                              <div style={{ border: "1px solid #D9D9D9" }} className='flex w-[90%] cursor-pointer p-2 items-center justify-between bg-[#F5f5f5] rounded-lg'>
                                <p>Rename</p>
                                <CiEdit />
                              </div>
                              <div style={{ border: "1px solid #D9D9D9" }} className='flex w-[90%] cursor-pointer p-2 items-center justify-between bg-[#F5f5f5] rounded-lg mt-1'>
                                <p>Delete</p>
                                <CiTrash />
                              </div>
                            </div>
                            : null
                        }

                      </div>

                    )
                  })
                }

              </div>


            </div>
            :
            <div className=' ml-14 sm:mr-14 mr-3'>

              {
                arr?.map((item, index) => {
                  return (

                    <div key={index} className='flex relative md:w-[50%] sm:w-[80%] w-[100%] items-center gap-x-6 mb-4'>
                      <img src={PdfImage} alt="" className='w-[2.5rem] h-[2.5rem]' />
                      <p className='text-sm'>Court plead</p>
                      <div style={{ border: "1px solid #d9d9d9" }} onClick={() => setshowPopup({ show:showPopup.id===item?false:true, id: item })} className='w-[3rem] h-[1.2rem] cursor-pointer rounded-lg flex justify-center items-center'>
                        <img src={DotImage} alt="" />
                      </div>
                      {
                        showPopup.show === true && showPopup.id === item ?
                          <div className='bg-[#D9D9D9] absolute top-0 h-[6rem] right-2 w-[10rem] rounded-lg flex justify-center items-center flex-col'>
                            <div style={{ border: "1px solid #D9D9D9" }} className='flex w-[90%] cursor-pointer p-1 pl-2 pr-2 items-center justify-between bg-[#F5f5f5] rounded-lg'>
                              <p>Rename</p>
                              <CiEdit />
                            </div>
                            <div style={{ border: "1px solid #D9D9D9" }} className='flex w-[90%] cursor-pointer p-1 pl-2 pr-2 items-center justify-between bg-[#F5f5f5] rounded-lg mt-1'>
                              <p>Delete</p>
                              <CiTrash />
                            </div>
                          </div>
                          : null
                      }

                    </div>
                  )
                })
              }
            </div>
        }


      </div>

      <div>

        {/* RESPONSIVE SIDE BAR COMPONENT  */}
        {
          showSideBar && (
            <div className='lg:hidden block absolute top-0 left-0'><Left showSideBar={showSideBar} setshowSideBar={setshowSideBar} /></div>
          )
        }
      </div>

    </div>
  )
}

export default UploadAndDownloadPdf
