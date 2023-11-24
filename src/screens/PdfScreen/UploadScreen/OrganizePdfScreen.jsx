import React from 'react'
import Dashboard from '../../../components/dynamic/Dashboard/Dashboard'
import Main from '../../../components/static/RightSide/Pdf/Main'

const OrganizePdfScreen = () => {
  return (
    <>
      <Dashboard component={<Main title={"Organize Your Pdf"} link={"/pdf/organize/content"} description={"Easily organize your PDF files. "}/>} />
    </>
  )
}

export default OrganizePdfScreen
