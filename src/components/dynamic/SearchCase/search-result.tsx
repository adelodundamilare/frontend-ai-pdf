import { ICaseData } from "@/lib/types";
import React from "react";
import CaseCard from "./search-card";

interface SearchResultsProps {
  results: ICaseData[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="mt-4">
      {results.map((result, index) => (
        <div key={index}>
          <CaseCard caseData={result} />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
