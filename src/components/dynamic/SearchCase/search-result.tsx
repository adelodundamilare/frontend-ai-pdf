import { ICaseData } from "@/lib/types";
import React from "react";
import CaseCard from "./search-card";

interface SearchResultsProps {
  results: ICaseData[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (!results) {
    <div className="h-[200px] bg-gray-50 grid place-content-center">
      No Case Found
    </div>;
  }
  return (
    <div className="mt-4  gap-2 grid">
      {results &&
        results.map((result, index) => (
          <div key={index}>
            <CaseCard caseData={result} />
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
