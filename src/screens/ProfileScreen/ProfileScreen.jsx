import React from 'react'
import UserProfile from '../../components/static/RightSide/Profile/UserProfile'
import Dashboard from '../../components/dynamic/Dashboard/Dashboard'

const ProfileScreen = () => {
  return (
    <>
      <Dashboard component={<UserProfile/>}/>
    </>
  )
}

export default ProfileScreen
