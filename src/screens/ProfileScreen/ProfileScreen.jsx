import React from "react";
import UserProfile from "@/components/static/RightSide/Profile/UserProfile";
import DashboardLayout from "@/layouts/dashboard-layout";

const ProfileScreen = () => {
  return (
    <DashboardLayout>
      <UserProfile />
    </DashboardLayout>
  );
};

export default ProfileScreen;
