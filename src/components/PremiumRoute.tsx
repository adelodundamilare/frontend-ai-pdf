import AppQuery from "@/services/query";
import React from "react";
import { Route, Navigate } from "react-router-dom";
import ProgressModal from "./Progress";

interface Props {
  children: React.ReactElement;
}
export const PremiumRoute = ({ children }: Props) => {
  const {
    data: isSubscribed,
    isLoading,
    error,
  } = AppQuery.useSubscriptionStatus();

  if (isLoading) {
    return <ProgressModal isLoading={isLoading} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isSubscribed) {
    return <Navigate to="/subscription" replace />;
  }

  return children;
};
