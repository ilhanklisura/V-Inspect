// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Admin stranice
import Users from "./pages/admin/Users";
import Vehicles from "./pages/admin/Vehicles";
import Stations from "./pages/admin/Stations";

// Vlasnik vozila stranice
import MyVehicles from "./pages/owner/MyVehicles";
import MyInspections from "./pages/owner/MyInspections";
import ScheduleInspection from "./pages/owner/ScheduleInspection";

// Osoblje inspekcije stranice
import PendingInspections from "./pages/staff/PendingInspections";
import CompletedInspections from "./pages/staff/CompletedInspections";

import Inspections from "./pages/admin/Inspections";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/unauthorized"
            element={
              <Layout>
                <Unauthorized />
              </Layout>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Admin rute */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/vehicles" element={<Vehicles />} />
              <Route path="/admin/stations" element={<Stations />} />
              <Route path="/admin/inspections" element={<Inspections />} />
            </Route>

            {/* Vlasnik vozila rute */}
            <Route
              element={<ProtectedRoute allowedRoles={["vehicle_owner"]} />}
            >
              <Route path="/my-vehicles" element={<MyVehicles />} />
              <Route path="/my-inspections" element={<MyInspections />} />
              <Route
                path="/schedule-inspection"
                element={<ScheduleInspection />}
              />
            </Route>

            {/* Osoblje za inspekciju rute */}
            <Route
              element={<ProtectedRoute allowedRoles={["inspection_staff"]} />}
            >
              <Route
                path="/pending-inspections"
                element={<PendingInspections />}
              />
              <Route
                path="/completed-inspections"
                element={<CompletedInspections />}
              />
            </Route>

            {/* Zajedničke rute */}
            <Route
              path="/profile"
              element={
                <Layout>
                  <div>User Profile</div>
                </Layout>
              }
            />
          </Route>

          {/* Osnovna redirekcija na dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 stranica */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
