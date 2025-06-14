import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Navigation from "../navigation/Navigation";
import VehicleOwnerDashboard from "../dashboard/VehicleOwnerDashboard";
import InspectionStaffDashboard from "../dashboard/InspectionStaffDashboard";
import AdminDashboard from "../dashboard/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user.role) {
      case "vehicle_owner":
        return <VehicleOwnerDashboard />;
      case "inspection_staff":
        return <InspectionStaffDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
