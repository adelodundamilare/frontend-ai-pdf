import React from 'react'
import SignPdfContent from '../../../components/static/RightSide/Pdf/MainContent/SignPdfContent'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'

const SignPdfContentScreen = () => {
  return (
    <>
      <Dashboard component={<SignPdfContent/>}/>
    </>
  )
}

export default SignPdfContentScreen
