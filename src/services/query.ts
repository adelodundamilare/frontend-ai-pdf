import { useQuery } from "@tanstack/react-query";
import SubscriptionService from "./subscription";

export default class AppQuery {
  static useSubscriptionStatus = () => {
    return useQuery({
      queryKey: ["subscriptionStatus"],
      queryFn: SubscriptionService.fetchSubscriptionStatus,
      refetchInterval: 60000, // Refetch every minute
      staleTime: 55000, // Consider data stale after 55 seconds
    });
  };
}
