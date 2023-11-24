import React from 'react'
import EditPdfContent from '../../../components/static/RightSide/Pdf/MainContent/EditPdfContent'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'

const EditPdfContentScreen = () => {
  return (
    <div>
      <Dashboard component={<EditPdfContent/>}/>
    </div>
  )
}

export default EditPdfContentScreen
