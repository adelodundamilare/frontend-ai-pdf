import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaGavel, FaCalendar, FaClock } from "react-icons/fa";
//
import DashboardBasicLayout from "@/layouts/dashboard-basic-layout";
import SubscriptionPopup from "@/components/dynamic/Popup/SubscriptionPopup";
import { authRequest } from "@/config/baseUrl";

import { ICaseData, IOpinion } from "@/lib/types";
import OpinionSingle from "@/components/dynamic/Popup/Opinion";

interface LocationState {
  data: ICaseData;
}

const SearchCaseSingleScreen = () => {
  const location = useLocation();
  const [opinionId, setOpinionId] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = (location.state as LocationState) || {};

  if (!data) {
    return (
      <div className="relative h-screen flex  justify-center items-center">
        <div>Invalid Case Data</div>
      </div>
    );
  }

  return (
    <DashboardBasicLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <header className="border-b pb-4">
          <h1 className="text-3xl font-bold">{data.caseName}</h1>
          <p className="text-gray-600">Court: {data.court}</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaGavel className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Status:</span>
              <span
                className={`px-2 py-1 text-sm rounded-full bg-green-100 text-green-800`}
              >
                {data.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendar className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Filing Date:</span>{" "}
              {data.dateFiled}
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Date Argued:</span>{" "}
              {data.dateArgued}
            </div>
          </div>
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Court:</span> {data.court}
            </p>
            <p>
              <span className="font-semibold">Attorney:</span> {data.attorney}
            </p>
            {/* <p><span className="font-semibold">Next Hearing:</span> {data.nextHearing}</p> */}
          </div>
        </section>

        {/* <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Parties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">Plaintiff</h3>
            <p>{data.plaintiff}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">Defendant</h3>
            <p>{data.defendant}</p>
          </div>
        </div>
      </section> */}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Case Snippet</h2>
          <p className="text-gray-700">
            {data?.opinions?.map((x, index) => (
              <div key={index} className="py-1">
                {x.snippet}
                {x.download_url && ` - `}
                <button
                  onClick={() => setOpinionId(x.id)}
                  className="text-primary ml-1 underline"
                >
                  {" "}
                  Read Full Opinion
                </button>
              </div>
            ))}
          </p>
        </section>

        {/* <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Case Documents</h2>
        <ul className="divide-y">
          {data.documents.map((doc) => (
            <li key={doc.id} className="py-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FaFile  className="w-5 h-5 text-gray-600" />
                <span>{doc.name}</span>
              </div>
              <span className="text-sm text-gray-600">{doc.date}</span>
            </li>
          ))}
        </ul>
      </section> */}

        {opinionId !== undefined && (
          <div className=" absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
            <div className=" w-full h-full flex justify-center items-center opacity-100">
              <div className=" mt-auto mb-auto flex justify-center items-center opacity-100">
                <OpinionSingle
                  onClose={() => setOpinionId(undefined)}
                  opinionId={opinionId}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardBasicLayout>
  );
};

export default SearchCaseSingleScreen;
