import React from 'react'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'
import Main from '../../../components/static/RightSide/Pdf/Main'

const UnlockPdfScreen = () => {
  return (
    <>
      <Dashboard component={<Main title={"Unlock PDF file"} link={"/pdf/unlock/content"} description={"Unlock your PDF file in just one click."}/>} />
    </>
  )
}

export default UnlockPdfScreen
