import React from 'react'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'
import Main from '../../../components/static/RightSide/Pdf/Main'

const StampPdfScreen = () => {
  return (
    <>
        <Dashboard component={<Main title={"Stamp Pdf"} link={"/pdf/stamp/content"} description={"Stamp your pdf in seconds. "}/>} />
    </>
  )
}

export default StampPdfScreen
