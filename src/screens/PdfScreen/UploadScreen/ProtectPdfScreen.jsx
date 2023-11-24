import React from 'react'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'
import Main from '../../../components/static/RightSide/Pdf/Main'

const ProtectPdfScreen = () => {
  return (
    <>
      <Dashboard component={<Main title={"Protect PDF file"} link={"/pdf/protect/content"} description={"Encrypt your PDF with a password to keep sensitive data confidential."}/>} />
    </>
  )
}

export default ProtectPdfScreen

