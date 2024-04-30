import DashboardLayout from "@/layouts/dashboard-layout";
import SearchForm from "@/components/dynamic/SearchCase/search-form";
import SearchResults from "@/components/dynamic/SearchCase/search-result";
import { useState } from "react";

const SearchCaseScreen = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <SearchForm callback={(data) => setSearchResults(data)} />
        <SearchResults results={searchResults} />
      </div>
    </DashboardLayout>
  );
};

export default SearchCaseScreen;
