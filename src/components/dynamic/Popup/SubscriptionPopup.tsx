import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

import CopyIcon from "../../../assets/copy3.svg";
import DownloadIcon from "../../../assets/download.svg";
import CrossIcon from "../../../assets/cross.svg";
import { IPlans, IPrice } from "@/lib/types";
import SubscriptionService from "@/services/subscription";
import ProgressModal from "@/components/Progress";
import { convertCentsToDollars } from "@/constants/helpers";
import AppMutation from "@/services/mutation";

const SubscriptionPopup = () => {
  const [message, setMessage] = useState("");
  const [plan, setPlan] = useState<IPlans>();
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const {
    data: plans,
    isLoading,
    error,
  } = useQuery<IPlans[], Error>({
    queryKey: ["plans"],
    queryFn: () => SubscriptionService.getPlans(),
  });

  const Back = () => {
    // Redirect to the subscription page
    nav("/dashboard");
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");

    if (status == "success") {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (status == "canceled") {
      setErrorMessage("Order canceled. Continue shopping or try again.");
    }
  }, [location.search]);

  if (isLoading) return <ProgressModal isLoading={isLoading} />;
  return (
    <div className="subscription-popup-overlay">
      <div className="subscription-popup">
        <div className=" bg-white font-roboto p-3 rounded-md md:w-[50vw] sm:w-[80vw] w-[98vw]">
          {/* <img src={CrossIcon} alt="" srcSet="" className=' float-right cursor-pointer' onClick={() => setshowSubscriptionPopup(false)} /> */}
          <img
            src={CrossIcon}
            alt=""
            srcSet=""
            className=" float-right cursor-pointer"
            onClick={Back}
          />

          <h1 className="text-center text-xl">PRO Subscription</h1>

          {error && (
            <div className="bg-red-50 text-red-500 p-2 mb-2">
              Error: {error?.message}
            </div>
          )}

          {errorMessage && (
            <>
              <div className="bg-red-50 text-red-500 p-2 mb-2">
                Error: {errorMessage}
              </div>
              <SelectPlan
                plans={plans ?? []}
                callback={(plan) => setPlan(plan)}
              />
            </>
          )}
          {message || plans?.length === 0 ? (
            <>
              <p className="bg-green-50 text-green-500 p-2">{message}</p>
              <SuccessView plan={plan} />
            </>
          ) : (
            <SelectPlan
              plans={plans ?? []}
              callback={(plan) => setPlan(plan)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPopup;

interface ISuccessView {
  plan?: IPlans;
}
const SuccessView = ({ plan }: ISuccessView) => {
  const manageSubscription = useMutation({
    mutationFn: SubscriptionService.manageSubscription,
    onSuccess: (res: any) => {
      window.location.href = res?.data;
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? "Something went wrong, please try again.");
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    manageSubscription.mutate({
      page_url: `${window.location.origin}/subscription`,
    });
  };

  return (
    <div className="">
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Next Steps</h3>
        <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
          <li>Check your email for a confirmation of your subscription</li>
          <li>Explore your new features in your account dashboard</li>
          <li>Reach out to our support team if you have any questions</li>
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={manageSubscription.isPending}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {manageSubscription.isPending
            ? "Processing..."
            : "Manage Subscription"}
        </button>
      </div>
    </div>
  );
};

interface ISelectPlan {
  plans: IPlans[];
  callback: (plan: IPlans) => any;
}
const SelectPlan = ({ callback, plans }: ISelectPlan) => {
  const [isMonthly, setIsMonthly] = useState(true);
  const nav = useNavigate();

  const handleSelectPayment = (plan: IPlans) => {
    callback(plan);
    nav("/select/payment", {
      state: { plan, isMonthly, price: getPrice(plan) },
    });
  };

  const getPrice = (plan: IPlans): IPrice => plan.prices[isMonthly ? 1 : 0];

  return (
    <div>
      <div className="flex justify-between items-start mt-8 w-[100%]">
        <div className="flex flex-1 gap-x-3 items-start">
          <div>
            <img src={CopyIcon} alt="" />
          </div>

          <div>
            <p className="sm:text-base text-sm">Unlimited File Upload</p>
            <p className="text-[#707078] sm:text-base text-sm mt-3">
              Ask your files anything
            </p>
          </div>
        </div>

        <div className="flex flex-1 gap-x-3 items-start">
          <div>
            <img src={DownloadIcon} alt="" className="w-[2rem]" />
          </div>

          <div>
            <p className="sm:text-base text-sm">
              Access to Unlimited file download
            </p>
            <p className="text-[#707078] sm:text-base text-sm mt-3 w-[80%]">
              Download all edited file from the PDF toolbox with no restriction
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <span className="mr-2">Monthly</span>
        <Switch
          onChange={() => setIsMonthly((prevState) => !prevState)}
          checked={!isMonthly}
          uncheckedIcon={false}
          checkedIcon={false}
          offColor="#999"
          onColor="#20808D"
        />
        <span className="ml-2">Yearly</span>
      </div>
      <div className="flex justify-between gap-x-5 items-start mt-8 w-[100%]">
        {plans &&
          plans.length > 0 &&
          plans
            .sort((a, b) => a.prices[0]?.amount - b.prices[0]?.amount)
            ?.map((plan) => (
              <div
                key={plan?.id}
                style={{ border: "1px solid #D9D9D9" }}
                className="flex-1 h-[12rem] relative rounded-[0.375rem] p-3"
              >
                <p className="text-[#20808D] mb-3 sm:text-base text-sm">
                  {plan?.name}
                </p>
                <p className="mb-3 sm:text-base text-sm">
                  ${convertCentsToDollars(getPrice(plan).amount)}
                </p>
                <p className="text-[#7070778] mb-3 sm:text-base text-sm">
                  Billed {isMonthly ? "per month" : "per year"}
                </p>
                <div className="absolute bottom-4 right-2 left-2">
                  <button
                    onClick={() => handleSelectPayment(plan)}
                    className="bg-[#20808D] w-[100%] h-[2.4rem] rounded-md text-white"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
