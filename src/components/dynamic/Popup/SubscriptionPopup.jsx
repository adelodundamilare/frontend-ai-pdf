import React, { useState, useEffect } from "react";
import CopyIcon from "../../../assets/copy3.svg";
import GiftIcon from "../../../assets/gift.svg";
import DownloadIcon from "../../../assets/download.svg";
import CrossIcon from "../../../assets/cross.svg";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config/baseUrl";
import axios from "axios";

const SubscriptionPopup = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [message, setMessage] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      const token = localStorage.getItem("token");
      console.log(token, "token");

      try {
        if (token) {
          const response = await axios(
            `${BASE_URL}/payment/subscription_list/`,
            {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          console.log(response, "res");

          if (response.status === 200) {
            const data = response.data;
            setSubscriptionPlans(data);
          } else {
            console.error("Error fetching data:", response.status);
            // Handle error scenarios accordingly
          }
        } else {
          console.error("Token not found");
          // Handle case when token is not available in localStorage
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSubscriptionPlans(); // Always fetch subscription plans regardless of token availability

    const query = new URLSearchParams(location.search);
    const success = query.get("success");

    console.log(success, "query");

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled. Continue shopping or try again.");
    }
  }, [location.search]);

  const Back = () => {
    // Redirect to the subscription page
    nav("/dashboard");
  };

  const convertCentsToDollars = (cents) => {
    return (cents / 100).toFixed(2); // Convert cents to dollars with two decimal places
  };

  const handleSelectPayment = (planId, duration, price) => {
    // Redirect or perform any other action, here just updating context values
    // nav('/select/payment',{planId: planId, duration: duration, price: price} );
    nav("/select/payment", { state: { planId, duration, price } });
  };

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

          <div className="flex justify-between gap-x-5 items-start mt-8 w-[100%]">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                style={{ border: "1px solid #D9D9D9" }}
                className="flex-1 h-[12rem] relative rounded-[0.375rem] p-3"
              >
                <p className="text-[#20808D] mb-3 sm:text-base text-sm">
                  {plan.duration}
                </p>
                <p className="mb-3 sm:text-base text-sm">
                  ${convertCentsToDollars(plan.price)}
                </p>
                <p className="text-[#7070778] mb-3 sm:text-base text-sm">
                  Billed per month
                </p>
                <div className="absolute bottom-4 right-2 left-2">
                  <button
                    onClick={() =>
                      handleSelectPayment(plan.id, plan.duration, plan.price)
                    }
                    className="bg-[#20808D] w-[100%] h-[2.4rem] rounded-md text-white"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}

            {/* <div style={{border:"1px solid #D9D9D9"}} className='flex-1 h-[12rem] relative rounded-[0.375rem] p-3'>
          <p className='text-[#20808D] mb-1 sm:text-base text-sm'>Yearly</p>
          <p className=' text-right text-[#303038] mb-1 sm:text-base text-sm'>Save $40 a year</p>
          <p className='mb-3 sm:text-base text-sm'>$20</p>
          <p className='text-[#7070778] mb-3 sm:text-base text-sm'>Billed per month</p>
          <div className='absolute bottom-4 right-2 left-2'>
            <button className='bg-[#20808D] w-[100%] h-[2.4rem] rounded-md text-white'>Get Started</button>
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPopup;
