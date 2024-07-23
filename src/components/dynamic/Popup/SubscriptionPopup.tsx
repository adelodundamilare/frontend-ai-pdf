import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

import CopyIcon from "../../../assets/copy3.svg";
import DownloadIcon from "../../../assets/download.svg";
import CrossIcon from "../../../assets/cross.svg";
import "../../../App.css";
import { BASE_URL } from "../../../config/baseUrl";
import { IPlans } from "@/lib/types";
import SubscriptionService from "@/services/subscription";

const SubscriptionPopup = () => {
  const [message, setMessage] = useState("");
  const [isMonthly, setIsMonthly] = useState(true);

  const {
    data: plans,
    isLoading,
    error,
  } = useQuery<IPlans[], Error>({
    queryKey: ["plans"],
    queryFn: () => SubscriptionService.getPlans(),
  });

  const nav = useNavigate();

  const Back = () => {
    // Redirect to the subscription page
    nav("/dashboard");
  };

  const convertCentsToDollars = (cents: number) => {
    return (cents / 100).toFixed(2); // Convert cents to dollars with two decimal places
  };

  const handleSelectPayment = (plan: IPlans) => {
    // Redirect or perform any other action, here just updating context values
    // nav('/select/payment',{planId: planId, duration: duration, price: price} );
    nav("/select/payment", { state: { plan } });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const success = query.get("success");

    if (success) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled. Continue shopping or try again.");
    }
  }, [location.search]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
          <p>{message}</p>

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
                  Download all edited file from the PDF toolbox with no
                  restriction
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
                      $
                      {convertCentsToDollars(
                        plan?.prices[isMonthly ? 0 : 1]?.amount
                      )}
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
      </div>
    </div>
  );
};

export default SubscriptionPopup;
