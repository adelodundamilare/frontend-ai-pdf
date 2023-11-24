import React from 'react'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'
import Main from '../../../components/static/RightSide/Pdf/Main'

const OCRPdfScreen = () => {
  return (
    <>
      <Dashboard component={<Main title={"OCR Your Pdf"} link={"/pdf/OCR/content"} description={"Easily convert scanned pdf into searchable and selectable document."}/>} />
    </>
  )
}

export default OCRPdfScreen
