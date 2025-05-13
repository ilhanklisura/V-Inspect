// src/components/common/Layout.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Layout.css";

const Layout = ({ children }) => {
  const { user, logout, isAdmin, isVehicleOwner, isInspectionStaff } =
    useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <Link to="/dashboard">V-Inspect</Link>
        </div>
        {user && (
          <div className="user-info">
            <span>{user.name || user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="app-content">
        {user && (
          <nav className="sidebar">
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              {/* Zajedničke opcije za sve korisnike */}
              <li>
                <Link to="/profile">My Profile</Link>
              </li>

              {/* Opcije za vlasnike vozila */}
              {isVehicleOwner() && (
                <>
                  <li>
                    <Link to="/my-vehicles">My Vehicles</Link>
                  </li>
                  <li>
                    <Link to="/my-inspections">My Inspections</Link>
                  </li>
                  <li>
                    <Link to="/schedule-inspection">Schedule Inspection</Link>
                  </li>
                </>
              )}

              {/* Opcije za osoblje inspekcije */}
              {isInspectionStaff() && (
                <>
                  <li>
                    <Link to="/pending-inspections">Pending Inspections</Link>
                  </li>
                  <li>
                    <Link to="/completed-inspections">
                      Completed Inspections
                    </Link>
                  </li>
                </>
              )}

              {/* Opcije za administratore */}
              {isAdmin() && (
                <>
                  <li>
                    <Link to="/admin/users">Manage Users</Link>
                  </li>
                  <li>
                    <Link to="/admin/vehicles">Manage Vehicles</Link>
                  </li>
                  <li>
                    <Link to="/admin/stations">Manage Stations</Link>
                  </li>
                  <li>
                    <Link to="/admin/inspections">All Inspections</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}

        <main className="main-content">{children}</main>
      </div>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} V-Inspect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
