import React from 'react'
import Left from '../../static/LeftSide/Left'

const Dashboard = ({component}) => {
  return (
    <div className='flex items-start w-screen h-screen'>
      <div className='lg:block hidden'>
        <Left/>
      </div>
      <div className='flex-1'>
        {component}
      </div>
    </div>
  )
}

export default Dashboard