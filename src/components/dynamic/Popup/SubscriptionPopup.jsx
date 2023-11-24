import React from 'react'
import CopyIcon from '../../../assets/copy3.svg'
import GiftIcon from '../../../assets/gift.svg'
import DownloadIcon from '../../../assets/download.svg'
import CrossIcon from '../../../assets/cross.svg'

const SubscriptionPopup = ({ setshowSubscriptionPopup }) => {
  return (
    <div className=' bg-white font-roboto p-3 rounded-md md:w-[50vw] sm:w-[80vw] w-[98vw]'>
      <img src={CrossIcon} alt="" srcset="" className=' float-right cursor-pointer' onClick={() => setshowSubscriptionPopup(false)} />
      <h1 className='text-center text-xl'>PRO Subscription</h1>

      <div className='flex justify-between items-start mt-8 w-[100%]'>

        <div className='flex flex-1 gap-x-3 items-start'>

          <div>
            <img src={CopyIcon} alt="" />
          </div>

          <div>
            <p className='sm:text-base text-sm'>Unlimited File Upload</p>
            <p className='text-[#707078] sm:text-base text-sm mt-3'>Ask your files anything</p>
          </div>

        </div>

        <div className='flex flex-1 gap-x-3 items-start'>

          <div>
            <img src={DownloadIcon} alt="" className='w-[2rem]' />
          </div>

          <div>
            <p className='sm:text-base text-sm'>Access to Unlimited file download</p>
            <p className='text-[#707078] sm:text-base text-sm mt-3 w-[80%]'>Download all edited file from the PDF toolbox with no restriction</p>
          </div>

        </div>

      </div>

      <div className='flex justify-between gap-x-5 items-start mt-8 w-[100%]'>

        <div style={{border:"1px solid #D9D9D9"}} className='flex-1 h-[12rem] relative rounded-[0.375rem] p-3'>
          <p className='text-[#20808D] mb-3 sm:text-base text-sm'>Monthly</p>
          <p className='mb-3 sm:text-base text-sm'>$20</p>
          <p className='text-[#7070778] mb-3 sm:text-base text-sm'>Billed per month</p>
          <div className='absolute bottom-4 right-2 left-2'>
            <button className='bg-[#20808D] w-[100%] h-[2.4rem] rounded-md text-white'>Get Started</button>
          </div>
        </div>


        <div style={{border:"1px solid #D9D9D9"}} className='flex-1 h-[12rem] relative rounded-[0.375rem] p-3'>
          <p className='text-[#20808D] mb-1 sm:text-base text-sm'>Yearly</p>
          <p className=' text-right text-[#303038] mb-1 sm:text-base text-sm'>Save $40 a year</p>
          <p className='mb-3 sm:text-base text-sm'>$20</p>
          <p className='text-[#7070778] mb-3 sm:text-base text-sm'>Billed per month</p>
          <div className='absolute bottom-4 right-2 left-2'>
            <button className='bg-[#20808D] w-[100%] h-[2.4rem] rounded-md text-white'>Get Started</button>
          </div>
        </div>


      </div>

    </div>
  )
}

export default SubscriptionPopup
