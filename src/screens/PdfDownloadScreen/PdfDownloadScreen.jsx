import React from 'react'
import UploadAndDownloadPdf from '../../components/dynamic/Pdf/UploadAndDownloadPdf'
import Dashboard from '../../components/dynamic/Dashboard/Dashboard'
const PdfDownloadScreen = () => {
  return (
    <div>
      <Dashboard component={<UploadAndDownloadPdf title={"Downloaded Files"}/>}/>
    </div>
  )
}

export default PdfDownloadScreen
