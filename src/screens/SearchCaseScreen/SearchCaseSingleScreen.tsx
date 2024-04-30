import DashboardLayout from "@/layouts/dashboard-layout";
import ArrowIcon from "@/assets/carrow2.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressModal from "@/components/Progress";
import { ICaseData } from "@/lib/types";

const SearchCaseSingleScreen = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [singleCase, setSingleCase] = useState<ICaseData | undefined>();

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.case.law/v1/cases/${id}/?full_case=true`,
          {
            headers: {
              Authorization: `Token ${import.meta.env.VITE_CASELAW_API_KEY}`,
            },
          }
        );
        const data = await response.json();
        console.log({ data });
        setSingleCase(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchCase();
  }, []);

  if (isLoading) {
    return <ProgressModal isLoading={isLoading} />;
  }

  if (!singleCase) {
    return (
      <div className="relative h-screen flex  justify-center items-center">
        <div>Invalid case id</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative">
        <div className="flex-1 font-roboto h-screen overflow-y-auto pt-3 pb-5">
          <div className="flex justify-center w-[100%] items-center">
            <h1 className="text-center w-[100%] text-2xl">
              {singleCase?.name ?? ""}
            </h1>
          </div>

          {/* LINE TAG  */}
          <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-5"></div>

          {/* MAIN PROFILE SECTION AND SIDE INFO   */}

          <div className="w-[100%] h-fit mt-4 flex justify-center items-center">
            <div className="sm:w-[50%] w-[80%]">
              {/* USER INFO  */}

              <div>
                {/* ACCOUNT HEADING AND LINE  */}
                <div>
                  <h1 className="text-2xl">Case Details</h1>
                  <div className="w-[100%] h-[1px] bg-[#D9D9D9] mt-2"></div>
                </div>
                <div className=" gap-x-4"></div>
                {/* PROFILE INFO  */}
                <div className="w-[100%] bg-[#F5F5F5] p-3 mt-3 rounded-md ">
                  <LineItem
                    title="Decision Date"
                    value={singleCase.decision_date}
                  />
                  <LineItem
                    title="Docket Number"
                    value={singleCase.docket_number}
                  />
                </div>
              </div>

              {/* SITE INFO  */}
              <div className="mt-4">
                {/* ACCOUNT HEADING AND LINE  */}
                <h1 className="text-2xl">Volume</h1>
                <div className="w-[100%] bg-[#F5F5F5] p-3 mt-3 rounded-md ">
                  <LineItem
                    title="Number"
                    value={singleCase.volume.volume_number}
                  />
                  <LineItem title="Barcode" value={singleCase.volume.barcode} />
                  <LineItem title="Url" value={singleCase.volume.url} />
                </div>
                <div className="mt-4">
                  {/* ACCOUNT HEADING AND LINE  */}
                  <h1 className="text-2xl">Reporter</h1>
                  <div className="w-[100%] bg-[#F5F5F5] p-3 mt-3 rounded-md ">
                    <LineItem
                      title="Full name"
                      value={singleCase.reporter.full_name}
                    />
                    <LineItem title="Url" value={singleCase.reporter.url} />
                  </div>
                </div>

                <div className="w-[100%] bg-[#F5F5F5] pl-4 pr-4 pt-5 pb-5 mt-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>Download PDF</p>
                    </div>
                    <a
                      href={singleCase.frontend_pdf_url}
                      className="flex gap-2 bg-[#E8E8E3] p-1 rounded-sm cursor-pointer"
                    >
                      <img src={ArrowIcon} alt="" />
                      <p>Click here</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SearchCaseSingleScreen;

interface ILineItem {
  title: string;
  value: string;
}
const LineItem = ({ title, value }: ILineItem) => {
  return (
    <div className="flex py-2 justify-between w-full">
      <p>{title}</p>
      <p className="text-gray-500"> {value}</p>
    </div>
  );
};
