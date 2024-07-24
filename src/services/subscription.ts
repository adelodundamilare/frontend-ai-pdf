import { authRequest } from "@/config/baseUrl";
import { MakePaymentDto, ManageSubscriptionDto } from "@/lib/dtos";
import { IPlans } from "@/lib/types";

export default class SubscriptionService {
  static getPlans = async (): Promise<IPlans[]> => {
    const response = await authRequest.get(`/subscription/list/`);
    return response?.data?.data ?? [];
  };

  static makePayment = async (data: MakePaymentDto): Promise<any> => {
    const res = await authRequest.post(
      `/subscription/create-checkout-session/`,
      data
    );
    return res?.data;
  };

  static manageSubscription = async (
    data: ManageSubscriptionDto
  ): Promise<any> => {
    const res = await authRequest.post(
      `/subscription/create-portal-session/`,
      data
    );
    return res?.data;
  };

  static fetchSubscriptionStatus = async () => {
    const res = await authRequest.get("/subscription/status/");
    return res.data.subscription;
  };
}
