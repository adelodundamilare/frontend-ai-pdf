import React from 'react';

const CompressPdfMessage = ({ compressedFileUrl, onClose }) => {
  const extractFilenameFromUrl = (url) => {
    const urlObject = new URL(url);
    return urlObject.pathname.split('/').pop();
  };

  const downloadCompressPdf = async () => {
    try {
      const response = await fetch(compressedFileUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", extractFilenameFromUrl(compressedFileUrl));
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
      <p className="text-2xl text-[#303030] mb-4">PDFs have been Compressed!</p>
      <button
        className="bg-[#20808D] text-white p-5 rounded-lg w-[20rem]"
        onClick={downloadCompressPdf}
      >
        Download compressed PDF
      </button>
    </div>
  </div>
  );
};

export default CompressPdfMessage;
