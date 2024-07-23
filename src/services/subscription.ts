import { authRequest } from "@/config/baseUrl";
import { IPlans } from "@/lib/types";

export default class SubscriptionService {
  static getPlans = async (): Promise<IPlans[]> => {
    const response = await authRequest.get(`/subscription/list/`);
    return response?.data?.data ?? [];
  };
}
