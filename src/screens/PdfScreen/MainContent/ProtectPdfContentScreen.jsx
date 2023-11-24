import React from 'react'
import ProtectPdfContent from '../../../components/static/RightSide/Pdf/MainContent/ProtectPdfContent'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'

const ProtectPdfContentScreen = () => {
  return (
    <>
      <Dashboard component={<ProtectPdfContent/>}/>
    </>
  )
}

export default ProtectPdfContentScreen
