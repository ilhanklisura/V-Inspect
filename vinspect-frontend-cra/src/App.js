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
              <Route
                path="/admin/users"
                element={
                  <Layout>
                    <div>User Management</div>
                  </Layout>
                }
              />
              <Route
                path="/admin/vehicles"
                element={
                  <Layout>
                    <div>Vehicle Management</div>
                  </Layout>
                }
              />
              <Route
                path="/admin/stations"
                element={
                  <Layout>
                    <div>Station Management</div>
                  </Layout>
                }
              />
              <Route
                path="/admin/inspections"
                element={
                  <Layout>
                    <div>All Inspections</div>
                  </Layout>
                }
              />
            </Route>

            {/* Vlasnik vozila rute */}
            <Route
              element={<ProtectedRoute allowedRoles={["vehicle_owner"]} />}
            >
              <Route
                path="/my-vehicles"
                element={
                  <Layout>
                    <div>My Vehicles</div>
                  </Layout>
                }
              />
              <Route
                path="/my-inspections"
                element={
                  <Layout>
                    <div>My Inspections</div>
                  </Layout>
                }
              />
              <Route
                path="/schedule-inspection"
                element={
                  <Layout>
                    <div>Schedule Inspection</div>
                  </Layout>
                }
              />
            </Route>

            {/* Osoblje za inspekciju rute */}
            <Route
              element={<ProtectedRoute allowedRoles={["inspection_staff"]} />}
            >
              <Route
                path="/pending-inspections"
                element={
                  <Layout>
                    <div>Pending Inspections</div>
                  </Layout>
                }
              />
              <Route
                path="/completed-inspections"
                element={
                  <Layout>
                    <div>Completed Inspections</div>
                  </Layout>
                }
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
