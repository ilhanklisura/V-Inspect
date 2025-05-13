// src/pages/admin/Users.jsx
import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import "./Users.css";

// Mock podaci za korisnike
const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2023-01-01T10:00:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "vehicle_owner",
    createdAt: "2023-01-15T14:30:00",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    role: "vehicle_owner",
    createdAt: "2023-02-05T09:15:00",
  },
  {
    id: 4,
    name: "Inspection Staff 1",
    email: "staff1@example.com",
    role: "inspection_staff",
    createdAt: "2023-01-10T11:45:00",
  },
  {
    id: 5,
    name: "Inspection Staff 2",
    email: "staff2@example.com",
    role: "inspection_staff",
    createdAt: "2023-02-20T16:00:00",
  },
];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "vehicle_owner",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser.id) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                name: currentUser.name,
                email: currentUser.email,
                role: currentUser.role,
              }
            : user
        )
      );
    } else {
      // Add new user
      setUsers([
        ...users,
        {
          ...currentUser,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setShowForm(false);
    setCurrentUser({
      name: "",
      email: "",
      password: "",
      role: "vehicle_owner",
    });
  };

  const handleEdit = (user) => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "", // Don't set password when editing
      role: user.role,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter((user) => {
    const matchesTerm =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesTerm && matchesRole;
  });

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get pretty role name
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
      <div className="users-container">
        <div className="page-header">
          <h2>User Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrentUser({
                name: "",
                email: "",
                password: "",
                role: "vehicle_owner",
              });
              setShowForm(true);
            }}
          >
            Add New User
          </button>
        </div>

        <div className="filters-row">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="role-filters">
            <button
              className={`filter-btn ${roleFilter === "all" ? "active" : ""}`}
              onClick={() => setRoleFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${roleFilter === "admin" ? "active" : ""}`}
              onClick={() => setRoleFilter("admin")}
            >
              Admins
            </button>
            <button
              className={`filter-btn ${
                roleFilter === "vehicle_owner" ? "active" : ""
              }`}
              onClick={() => setRoleFilter("vehicle_owner")}
            >
              Vehicle Owners
            </button>
            <button
              className={`filter-btn ${
                roleFilter === "inspection_staff" ? "active" : ""
              }`}
              onClick={() => setRoleFilter("inspection_staff")}
            >
              Inspection Staff
            </button>
          </div>
        </div>

        {showForm && (
          <div className="user-form-container">
            <div className="card">
              <div className="card-header">
                <h3>{currentUser.id ? "Edit User" : "Add New User"}</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={currentUser.name}
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
                    value={currentUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {!currentUser.id && (
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={currentUser.password}
                      onChange={handleInputChange}
                      required={!currentUser.id}
                      minLength="6"
                    />
                    <small className="form-text">
                      {currentUser.id
                        ? "Leave blank to keep current password."
                        : "Password must be at least 6 characters."}
                    </small>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={currentUser.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="vehicle_owner">Vehicle Owner</option>
                    <option value="inspection_staff">Inspection Staff</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {currentUser.id ? "Update User" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="users-table-container">
          {filteredUsers.length === 0 ? (
            <div className="no-results">
              <p>No users match your search criteria.</p>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {getRoleName(user.role)}
                      </span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td className="actions-cell">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleEdit(user)}
                        title="Edit User"
                      >
                        Edit
                      </button>
                      {user.role !== "admin" && (
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(user.id)}
                          title="Delete User"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Users;
