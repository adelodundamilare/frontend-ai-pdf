import React from 'react';

const SplitPdfMessage = ({ splitedFileUrl, onClose }) => {

    console.log(splitedFileUrl, 'splitedFileUrl')
  const extractFilenameFromUrl = (url) => {
    const urlObject = new URL(url);
    return urlObject.pathname.split('/').pop();
  };

  const downloadSplitPdf = async () => {
    try {
      const response = await fetch(splitedFileUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", extractFilenameFromUrl(splitedFileUrl));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    //   onClose();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="text-center">
      <p className="text-2xl text-[#303030] mb-4">PDF has been split!</p>
      <button
        className="bg-[#20808D] text-white p-5 rounded-lg w-[20rem]"
        onClick={downloadSplitPdf}
      >
       Download split PDF
      </button>
    </div>


    


  </div>
  );
};

export default SplitPdfMessage;
