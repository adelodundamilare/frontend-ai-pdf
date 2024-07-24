import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { IPlans, IPrice } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import SubscriptionService from "@/services/subscription";
import { convertCentsToDollars } from "@/constants/helpers";

const PaymentPage = () => {
  const location = useLocation();

  const state = location.state || {};
  const plan: IPlans = state?.plan;
  const price: IPrice = state?.price;
  const isMonthly: boolean = state?.isMonthly;

  const makePayment = useMutation({
    mutationFn: SubscriptionService.makePayment,
    onSuccess: (res: any) => {
      window.location.href = res?.data;
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? "Something went wrong, please try again.");
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    makePayment.mutate({
      price_id: price.id,
      page_url: `${window.location.origin}/subscription`,
    });
  };

  return (
    <div className="">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Confirm Your Subscription
          </h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              {plan.name}
            </h3>
            <p className="text-gray-600 mb-2">{plan.description}</p>
            <p className="text-xl font-bold text-gray-800">
              ${convertCentsToDollars(price.amount)} /{" "}
              {isMonthly ? "monthly" : "yearly"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={makePayment.isPending}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {makePayment.isPending ? "Processing..." : "Confirm Payment"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            By confirming your subscription, you allow Lawtabby to charge your
            card for this payment and future payments in accordance with their
            terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
