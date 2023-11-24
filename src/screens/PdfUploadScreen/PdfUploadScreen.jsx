import React from 'react'
import UploadAndDownloadPdf from '../../components/dynamic/Pdf/UploadAndDownloadPdf'
import Dashboard from '../../components/dynamic/Dashboard/Dashboard'

const PdfUploadScreen = () => {
  return (
    <div>
      <Dashboard component={<UploadAndDownloadPdf title={"Uploaded Files"}/>}/>
    </div>
  )
}

export default PdfUploadScreen
