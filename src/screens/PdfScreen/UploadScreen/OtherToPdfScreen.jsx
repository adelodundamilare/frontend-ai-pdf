import React from 'react'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'
import Main from '../../../components/static/RightSide/Pdf/Main'

const OtherToPdfScreen = () => {
  return (
    <>
      <Dashboard component={<Main title={"Other File Formats to PDF file"} link={"/pdf/other/to/pdf/content"} description={"Turn your DOC, PPT, EXCEL, JPEG, PPTX and DOCX documents into PDF file. First by Choosing file format and then uploading the file accordingly "}/>} />
    </>
  )
}

export default OtherToPdfScreen