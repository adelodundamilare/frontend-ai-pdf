import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { authRequest } from "@/config/baseUrl";
import { ICaseResponse } from "@/lib/types";

interface Props {
  callback: (searchQuery: ICaseResponse) => void;
}

const SearchForm = ({ callback }: Props) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courts, setCourts] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);

  // replace with react query...
  // useEffect(() => {
  //   const fetchFilters = async () => {
  //     const [courtsRes, jurisdictionsRes] = await Promise.all([
  //       fetch(`https://api.case.law/v1/courts/?full_case=true`),
  //       fetch(`https://api.case.law/v1/jurisdictions/?full_case=true`),
  //     ]);

  //     courtsRes.json().then((data) => {
  //       setCourts(data.results);
  //     });

  //     jurisdictionsRes.json().then((data) => {
  //       setJurisdictions(data.results);
  //     });
  //   };

  //   fetchFilters();
  // }, []);

  const debounced = useDebouncedCallback((value) => {
    handleSubmit(value);
  }, 1000);

  const handleSubmit = async (value: string) => {
    try {
      setIsLoading(true);
      const response = await authRequest.get(`/case/search/?q=${value}`);
      callback(response?.data?.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-[100%] md:mt-0 mt-4">
        <div className="flex justify-center items-center w-[100%] flex-col">
          <h1 className="text-2xl mb-2 text-center ml-2 mr-2">
            Case Law Search
          </h1>
          <p className="md:w-[400px] w-[100%] text-center text-base text-[#303030] ml-2 mr-2">
            {" "}
            Search millions of opinions across hundreds of jurisdictions.
            Updated constantly.
          </p>
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-3">
        <div className="relative flex items-center w-full shadow-md h-12 rounded-lg focus-within:shadow-lg bg-gray-100 overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none bg-gray-100 text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            value={value}
            onChange={(e) => {
              debounced(e.target.value);
              setValue(e.target.value);
            }}
            placeholder="Enter your search keyword..."
          />

          {isLoading && (
            <div className="px-2">
              <SpinnerIcon />
            </div>
          )}
        </div>
      </form>
    </>

    // <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
    //   <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
    //     <input
    //       type="text"
    //       value={searchQuery}
    //       onChange={(e) => setSearchQuery(e.target.value)}
    //       placeholder="Search..."
    //       className="w-full px-4 py-2 bg-white text-gray-700 focus:outline-none"
    //     />
    //     <button
    //       type="submit"
    //       className="px-4 py-2 bg-primary text-white font-semibold hover:bg-primary focus:outline-none"
    //     >
    //       Search
    //     </button>
    //   </div>
    // </form>
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={searchQuery}
    //     onChange={(e) => setSearchQuery(e.target.value)}
    //   />
    //   <button type="submit">Search</button>
    // </form>
  );
};

export default SearchForm;

const SpinnerIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`.spinner_aj0A{transform-origin:center;animation:spinner_KYSC .75s infinite linear}@keyframes spinner_KYSC{100%{transform:rotate(360deg)}}`}</style>
      <path
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
        className="spinner_aj0A"
      />
    </svg>
  );
};
