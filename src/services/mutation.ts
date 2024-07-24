import { useMutation } from "@tanstack/react-query";
import SubscriptionService from "./subscription";
import { toast } from "react-toastify";

export default class AppMutation {
  static manageSubscription = useMutation({
    mutationFn: SubscriptionService.manageSubscription,
    onSuccess: (res: any) => {
      window.location.href = res?.data;
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? "Something went wrong, please try again.");
    },
  });
}
