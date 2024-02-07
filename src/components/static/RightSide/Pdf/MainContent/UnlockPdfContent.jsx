import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Left from '../../../LeftSide/Left'
import BackIcon from '../../../../../assets/back.svg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCopy } from "react-icons/fa";
import DeviceIcon from '../../../../../assets/device.svg'
import DropBoxIcon from '../../../../../assets/dropbox.svg'
import { AiOutlinePlus } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import { Document, Page } from "react-pdf";
import { toast } from "react-toastify";
import { authRequest } from '../../../../../config/baseUrl'
import LockPdf from '../../../../../assets/lockpdf.png'
import ProgressModal from "../../../../Progress";
import UnlockPdfMessage from './DownloadPDF/UnlockPdfMessage'

  
  

const UnlockPdfContent = () => {

    const [showSideBar, setshowSideBar] = useState(false)
    const [showLeftSideBar, setshowLeftSideBar] = useState(false)
    const [password, setPassword] = useState("");
    console.log(password.length, 'pass')
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [compressedFileUrl, setCompressedFileUrl] = useState(null);
    const [mergeID, setMergeId] = useState(null);
    const nav = useNavigate()
    const location = useLocation();
    console.log(location.state.pdf[0], 'pdf')
    const pdfFile = location.state.pdf[0];


   

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
      
        const formData = new FormData();
        formData.append("input_pdf", location.state.pdf[0]);
        formData.append("password", password);
      
        try {
          const response = await authRequest.post("/pdf/unlock_pdf/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const calculatedProgress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setProgress(calculatedProgress);
            },
          });
      
          // Handle successful response here
          console.log(response, 'r');
          const newcompressFileUrl = response.data.unlocked_pdf.unlock_pdf;
          setCompressedFileUrl(newcompressFileUrl); 
          console.log(newcompressFileUrl, 'newcompressFileUrl')
          const newMergeId = response.data.unlocked_pdf.id
          setMergeId(newMergeId)
    
          setIsButtonClicked(true)
      
          setIsLoading(false);
        } catch (error) {
          if (error.response) {

            const errorMessage = error.response.data.error;
            toast.error(`${errorMessage}`);
          } else if (error.request) {
            // The request was made but no response was received
            toast.error("No response from the server");
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("Unexpected error");
          }
      
          setIsLoading(false);
        }
      };

    if (isLoading) return <ProgressModal isLoading={isLoading} />;      

    return (
        <>

        {isButtonClicked ? (
            <UnlockPdfMessage
            mergeID ={mergeID}
            compressedFileUrl={compressedFileUrl}
              onClose={() => setIsButtonClicked(false)}
            />
          ) : (


        <div className='relative'>

            {/* HUMBURGER MENU  */}
            <div className='ml-3 md:hidden block pt-3'>
                <GiHamburgerMenu className='text-2xl cursor-pointer' onClick={() => setshowSideBar(!showSideBar)} />
            </div>

            <div className='flex justify-between h-[100vh] overflow-y-auto overflow-x-hidden font-roboto'>

                <div className='flex-1 relative'>

                    <div className='flex gap-3 cursor-pointer p-3 h-fit' onClick={() => nav("/pdf/unlock")}>
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
                            <p className='text-sm m-3 bg-white p-2'>
                              
                                
                                {/* <Document
                                        file={location.state.pdf[0]}
                                        onLoadError={(error) =>
                                        console.error("Error loading document:", error)
                                        }
                                    >
                                        <Page
                                        pageNumber={1}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                />
                                
                               </Document> */}
                               <img src={LockPdf} alt="" />
                             
                                </p>

                                <span style={{ display: 'block', textAlign: 'center', margin: '0 auto' }} className="font-bold">{pdfFile.name}</span>
                        </div>
                    </div>


                </div>


                <div className='w-[13rem] hidden  shadow-CardShadow md:flex justify-start items-center flex-col pt-4 pb-4 relative'>

                    <div className='flex justify-center items-center flex-col'>
                        <p className='text-lg text-center pl-4 pr-4'>Unlock Pdf</p>
                    </div>
                    <form onSubmit={handleSubmit}>

                    <div className='flex justify-center items-center flex-col mt-10'>
                   
                    <input
                            style={{ border: "1px solid rgba(48, 48, 48, 0.50)" }}
                            type="password"
                            placeholder="Type your password"
                            className="w-[100%] h-[2.3rem] rounded-md pl-3 pr-3 text-[#303030] outline-none"
                        
                            onChange={handlePasswordChange}
                            />
                    </div>



                    <div className=' absolute bottom-3 flex justify-center items-center'>
                    <button
                    type='submit'
                    className={`w-[10rem] h-[2.5rem] rounded-md ${
                    password.length === 0 ? 'bg-[#d9d9d9] text-[#8c8c8c]' : 'bg-[#20808D] text-white'
                    }`}
                    disabled={password.length === 0}
                    >
                    Unlock</button>
                    </div>
                    </form>

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
                                <p className='text-lg text-center pl-4 pr-4'>Unlock PDF</p>
                            </div>

                            <div className=' absolute bottom-3 flex justify-center items-center'>
                                <button className='bg-[#20808D] text-white w-[10rem] h-[2.5rem] rounded-md'   >Unlock</button>
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
        )}
        </>
    )
}

export default UnlockPdfContent
