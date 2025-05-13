// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/common/Layout";
import "./Dashboard.css";

// Dashboard komponente za različite uloge
const AdminDashboard = () => (
  <div className="dashboard-content">
    <h2>Admin Dashboard</h2>
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>Total Users</h3>
        <p className="stat-value">25</p>
      </div>
      <div className="stat-card">
        <h3>Total Vehicles</h3>
        <p className="stat-value">42</p>
      </div>
      <div className="stat-card">
        <h3>Total Inspections</h3>
        <p className="stat-value">78</p>
      </div>
      <div className="stat-card">
        <h3>Pending Inspections</h3>
        <p className="stat-value">12</p>
      </div>
    </div>
    <h3>Recent Activity</h3>
    <div className="recent-activity">
      <p>Loading recent activities...</p>
    </div>
  </div>
);

const VehicleOwnerDashboard = () => (
  <div className="dashboard-content">
    <h2>My Vehicle Dashboard</h2>
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>My Vehicles</h3>
        <p className="stat-value">3</p>
      </div>
      <div className="stat-card">
        <h3>Pending Inspections</h3>
        <p className="stat-value">1</p>
      </div>
      <div className="stat-card">
        <h3>Completed Inspections</h3>
        <p className="stat-value">5</p>
      </div>
    </div>
    <h3>Upcoming Inspections</h3>
    <div className="upcoming-inspections">
      <p>Loading upcoming inspections...</p>
    </div>
  </div>
);

const InspectionStaffDashboard = () => (
  <div className="dashboard-content">
    <h2>Inspection Staff Dashboard</h2>
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>Assigned Inspections</h3>
        <p className="stat-value">8</p>
      </div>
      <div className="stat-card">
        <h3>Pending</h3>
        <p className="stat-value">3</p>
      </div>
      <div className="stat-card">
        <h3>Completed Today</h3>
        <p className="stat-value">2</p>
      </div>
    </div>
    <h3>Today's Schedule</h3>
    <div className="today-schedule">
      <p>Loading today's schedule...</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, loading, isAdmin, isVehicleOwner, isInspectionStaff } =
    useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Please login to access the dashboard</div>;

  let DashboardComponent;

  if (isAdmin()) {
    DashboardComponent = AdminDashboard;
  } else if (isVehicleOwner()) {
    DashboardComponent = VehicleOwnerDashboard;
  } else if (isInspectionStaff()) {
    DashboardComponent = InspectionStaffDashboard;
  } else {
    DashboardComponent = () => <div>Unknown user role</div>;
  }

  return (
    <Layout>
      <DashboardComponent />
    </Layout>
  );
};

export default Dashboard;
