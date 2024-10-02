import { ICaseData } from "@/lib/types";
import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

interface CaseCardProps {
  caseData: ICaseData;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{caseData.caseName}</h3>
          <p className="text-sm text-gray-600">Court: {caseData.court}</p>
          <p className="text-sm text-gray-600">
            Date Argued: {caseData.dateArgued}
          </p>
        </div>
        <Link to="/search-case/single" state={{ data: caseData }}>
          <span
            className={`px-2 py-1 text-xs flex gap-1 font-semibold rounded-full bg-green-100 text-green-800`}
          >
            view <BiChevronRight />
          </span>
        </Link>
      </div>
    </div>

    // <div className="bg-gray-100 mb-2 shadow-md rounded-lg overflow-hidden">
    //   <div className="p-6">
    //     <h5 className="font-bold mb-1">{caseData.caseNameFull}</h5>
    //     <p className="text-gray-600 mb-1">Attorney: {caseData.attorney}</p>
    //     <div className="flex gap-2">
    //       <div className="flex items-center mb-1">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5 mr-2 text-gray-600"
    //           viewBox="0 0 20 20"
    //           fill="currentColor"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M10 2a1 1 0 00-1 1v6a1 1 0 102 0V3a1 1 0 00-1-1zM7 8a1 1 0 011-1h5a1 1 0 110 2H8a1 1 0 01-1-1z"
    //             clipRule="evenodd"
    //           />
    //           <path
    //             fillRule="evenodd"
    //             d="M15 14a1 1 0 00-1-1H6a1 1 0 100 2h8a1 1 0 001-1z"
    //             clipRule="evenodd"
    //           />
    //           <path
    //             fillRule="evenodd"
    //             d="M14 18a1 1 0 011-1h1a1 1 0 100-2h-1a1 1 0 110-2h1a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5h-1a1 1 0 100 2h1a1 1 0 110 2h-1a3 3 0 01-3-3v-1a1 1 0 10-2 0v1a5 5 0 005 5z"
    //             clipRule="evenodd"
    //           />
    //           <path
    //             fillRule="evenodd"
    //             d="M5 6a1 1 0 00-1-1H3a1 1 0 100 2h1a1 1 0 011-1zM4 10a1 1 0 100-2 1 1 0 000 2z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //         <p className="text-gray-600">Date Argued: {caseData.dateArgued}</p>
    //       </div>
    //       <div className="flex items-center mb-1">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5 mr-2 text-gray-600"
    //           viewBox="0 0 20 20"
    //           fill="currentColor"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M9 1a1 1 0 00-1 1v1H3a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V9h-2v8H4V4h6V2a1 1 0 00-1-1z"
    //             clipRule="evenodd"
    //           />
    //           <path
    //             fillRule="evenodd"
    //             d="M9 1a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0V7H4a1 1 0 110-2h3V2a1 1 0 011-1z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //         <p className="text-gray-600">
    //           Docket Number: {caseData.docketNumber}
    //         </p>
    //       </div>
    //     </div>
    //     <Link
    //       to="/search-case/single"
    //       state={{ data: caseData }}
    //       className="items-center inline-block text-white px-4 rounded-sm no-underline py-1 bg-primaryColor"
    //     >
    //       <span>View Details</span>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default CaseCard;
