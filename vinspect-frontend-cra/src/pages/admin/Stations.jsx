// src/pages/admin/Stations.jsx
import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import "./Stations.css";

// Mock podaci za stanice
const mockStations = [
  {
    id: 1,
    name: "Central Inspection Center",
    address: "123 Main St, Sarajevo",
    phone: "033-123-456",
    email: "central@vinspect.com",
    capacity: 8,
    status: "active",
  },
  {
    id: 2,
    name: "Northern Vehicle Inspection",
    address: "456 Oak Ave, Tuzla",
    phone: "035-789-012",
    email: "northern@vinspect.com",
    capacity: 5,
    status: "active",
  },
  {
    id: 3,
    name: "Eastern Inspection Point",
    address: "789 Pine Rd, Zenica",
    phone: "032-345-678",
    email: "eastern@vinspect.com",
    capacity: 3,
    status: "inactive",
  },
  {
    id: 4,
    name: "Southern Auto Check",
    address: "101 Elm St, Mostar",
    phone: "036-901-234",
    email: "southern@vinspect.com",
    capacity: 6,
    status: "active",
  },
];

const Stations = () => {
  const [stations, setStations] = useState(mockStations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [currentStation, setCurrentStation] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    capacity: 5,
    status: "active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStation({
      ...currentStation,
      [name]: name === "capacity" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentStation.id) {
      // Update existing station
      setStations(
        stations.map((station) =>
          station.id === currentStation.id ? currentStation : station
        )
      );
    } else {
      // Add new station
      setStations([
        ...stations,
        {
          ...currentStation,
          id: Date.now(),
        },
      ]);
    }

    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentStation({
      name: "",
      address: "",
      phone: "",
      email: "",
      capacity: 5,
      status: "active",
    });
  };

  const handleEdit = (station) => {
    setCurrentStation(station);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this inspection station?")
    ) {
      setStations(stations.filter((station) => station.id !== id));
    }
  };

  // Filter stations based on search term and status filter
  const filteredStations = stations.filter((station) => {
    const matchesTerm =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.phone.includes(searchTerm) ||
      station.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || station.status === statusFilter;

    return matchesTerm && matchesStatus;
  });

  return (
    <Layout>
      <div className="stations-container">
        <div className="page-header">
          <h2>Inspection Station Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            Add New Station
          </button>
        </div>

        <div className="filters-row">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search stations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="status-filters">
            <button
              className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${
                statusFilter === "active" ? "active" : ""
              }`}
              onClick={() => setStatusFilter("active")}
            >
              Active
            </button>
            <button
              className={`filter-btn ${
                statusFilter === "inactive" ? "active" : ""
              }`}
              onClick={() => setStatusFilter("inactive")}
            >
              Inactive
            </button>
          </div>
        </div>

        {showForm && (
          <div className="station-form-container">
            <div className="card">
              <div className="card-header">
                <h3>
                  {currentStation.id ? "Edit Station" : "Add New Station"}
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Station Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={currentStation.name}
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
                      value={currentStation.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={currentStation.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={currentStation.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="capacity">Daily Capacity</label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={currentStation.capacity}
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      required
                    />
                    <small className="form-text">
                      Maximum number of inspections per day
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={currentStation.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
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
                    {currentStation.id ? "Update Station" : "Add Station"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="stations-grid">
          {filteredStations.length === 0 ? (
            <div className="no-results">
              <p>No stations match your search criteria.</p>
            </div>
          ) : (
            filteredStations.map((station) => (
              <div
                key={station.id}
                className={`station-card ${
                  station.status === "inactive" ? "inactive" : ""
                }`}
              >
                <div className="station-header">
                  <h3>{station.name}</h3>
                  <span className={`status-badge ${station.status}`}>
                    {station.status}
                  </span>
                </div>

                <div className="station-details">
                  <p>
                    <i className="icon-location"></i> {station.address}
                  </p>
                  <p>
                    <i className="icon-phone"></i> {station.phone}
                  </p>
                  <p>
                    <i className="icon-email"></i> {station.email}
                  </p>
                  <p>
                    <i className="icon-capacity"></i> Daily Capacity:{" "}
                    {station.capacity} inspections
                  </p>
                </div>

                <div className="station-actions">
                  <button
                    className="btn-action btn-edit"
                    onClick={() => handleEdit(station)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(station.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Stations;
