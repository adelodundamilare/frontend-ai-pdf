import React from 'react'
import Dashboard from '../../components/dynamic/Dashboard/Dashboard'
import Chat from '../../components/static/RightSide/Chat/Chat'

const DashboardScreen = () => {
  return (
    <div>
      <Dashboard component={<Chat/>}/>
    </div>
  )
}

export default DashboardScreen