import { ICaseData } from "@/lib/types";
import React from "react";
import { Link } from "react-router-dom";

interface CaseCardProps {
  caseData: ICaseData;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  return (
    <div className="bg-gray-100 mb-2 shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h5 className="font-bold mb-1">{caseData.name}</h5>
        <p className="text-gray-600 mb-1">{caseData.name_abbreviation}</p>
        <div className="flex gap-2">
          <div className="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 00-1 1v6a1 1 0 102 0V3a1 1 0 00-1-1zM7 8a1 1 0 011-1h5a1 1 0 110 2H8a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M15 14a1 1 0 00-1-1H6a1 1 0 100 2h8a1 1 0 001-1z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M14 18a1 1 0 011-1h1a1 1 0 100-2h-1a1 1 0 110-2h1a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5h-1a1 1 0 100 2h1a1 1 0 110 2h-1a3 3 0 01-3-3v-1a1 1 0 10-2 0v1a5 5 0 005 5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M5 6a1 1 0 00-1-1H3a1 1 0 100 2h1a1 1 0 011-1zM4 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600">
              Decision Date: {caseData.decision_date}
            </p>
          </div>
          <div className="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 1a1 1 0 00-1 1v1H3a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V9h-2v8H4V4h6V2a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M9 1a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0V7H4a1 1 0 110-2h3V2a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600">
              Docket Number: {caseData.docket_number}
            </p>
          </div>
        </div>
        <Link
          to={`/search-case/${caseData.id}`}
          className="items-center inline-block text-white px-4 rounded-sm no-underline py-1 bg-primaryColor"
        >
          <span>View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default CaseCard;
