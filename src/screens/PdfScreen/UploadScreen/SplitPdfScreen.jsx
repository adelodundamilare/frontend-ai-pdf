import React from 'react'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'
import Main from '../../../components/static/RightSide/Pdf/Main'

const SplitPdfScreen = () => {
  return (
    <>
      <Dashboard component={<Main title={"Split PDF file"} link={"/pdf/split/content"} description={"Separate one page or a whole set for easy conversion into independent PDF files."}/>} />
    </>
  )
}

export default SplitPdfScreen