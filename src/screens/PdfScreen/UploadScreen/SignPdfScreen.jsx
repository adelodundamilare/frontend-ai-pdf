import React from 'react'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'
import Main from '../../../components/static/RightSide/Pdf/Main'

const SignPdfScreen = () => {
  return (
    <>
      <Dashboard component={<Main title={"Sign Pdf"} link={"/pdf/sign/content"} description={"Sign or request electronic signatures from others."}/>} />
    </>
  )
}

export default SignPdfScreen
