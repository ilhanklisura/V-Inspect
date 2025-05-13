// src/pages/Profile.jsx
import React, { useState } from "react";
import Layout from "../components/common/Layout";
import { useAuth } from "../hooks/useAuth";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      userData.newPassword &&
      userData.newPassword !== userData.confirmPassword
    ) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    // Here you would normally call an API to update the user profile
    // For now, we'll just simulate a successful update
    setTimeout(() => {
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
      setIsEditing(false);

      // Clear password fields
      setUserData({
        ...userData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // After a few seconds, clear success message
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1000);
  };

  const getRoleName = (role) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "vehicle_owner":
        return "Vehicle Owner";
      case "inspection_staff":
        return "Inspection Staff";
      default:
        return role;
    }
  };

  return (
    <Layout>
      <div className="profile-container">
        <h2>User Profile</h2>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
            <div className="profile-info">
              <h3>{user?.name || "User"}</h3>
              <p className="role-badge">{getRoleName(user?.role)}</p>
            </div>
            {!isEditing && (
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="password-section">
                <h4>Change Password</h4>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={userData.currentPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handleInputChange}
                    minLength="6"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    minLength="6"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setUserData({
                      name: user?.name || "",
                      email: user?.email || "",
                      phone: user?.phone || "",
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setErrorMessage("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-row">
                <span>Name:</span>
                <span>{user?.name || "Not set"}</span>
              </div>
              <div className="detail-row">
                <span>Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="detail-row">
                <span>Phone:</span>
                <span>{user?.phone || "Not set"}</span>
              </div>
              <div className="detail-row">
                <span>Role:</span>
                <span>{getRoleName(user?.role)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
