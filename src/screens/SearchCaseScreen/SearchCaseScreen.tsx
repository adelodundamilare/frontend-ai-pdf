import DashboardLayout from "@/layouts/dashboard-layout";
import SearchForm from "@/components/dynamic/SearchCase/search-form";
import SearchResults from "@/components/dynamic/SearchCase/search-result";
import { useState } from "react";
import { ICaseResponse } from "@/lib/types";

const SearchCaseScreen = () => {
  const [searchResults, setSearchResults] = useState<ICaseResponse>();

  console.log({ searchResults });

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <SearchForm callback={(data) => setSearchResults(data)} />
        <SearchResults results={searchResults?.results ?? []} />
      </div>
    </DashboardLayout>
  );
};

export default SearchCaseScreen;
