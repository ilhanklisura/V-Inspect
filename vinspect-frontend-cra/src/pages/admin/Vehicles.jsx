// src/pages/admin/Vehicles.jsx
import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import "./Vehicles.css";

// Mock podaci za vozila
const mockVehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2019,
    registrationNumber: "A12-B-345",
    vin: "JT2BF22K1W0123456",
    owner: {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
    },
    status: "active",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2020,
    registrationNumber: "E56-M-789",
    vin: "1HGCM82633A123456",
    owner: {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
    },
    status: "active",
  },
  {
    id: 3,
    brand: "Ford",
    model: "Focus",
    year: 2018,
    registrationNumber: "K78-C-910",
    vin: "1FAHP3K21CL123456",
    owner: {
      id: 3,
      name: "John Doe",
      email: "john@example.com",
    },
    status: "inactive",
  },
  {
    id: 4,
    brand: "Volkswagen",
    model: "Golf",
    year: 2021,
    registrationNumber: "P34-Q-567",
    vin: "WVWZZZ1KZ5W123456",
    owner: {
      id: 3,
      name: "John Doe",
      email: "john@example.com",
    },
    status: "active",
  },
  {
    id: 5,
    brand: "BMW",
    model: "320i",
    year: 2022,
    registrationNumber: "T12-U-345",
    vin: "WBA3B1C5XEP123456",
    owner: {
      id: 4,
      name: "Mike Johnson",
      email: "mike@example.com",
    },
    status: "active",
  },
];

// Mock podaci za vlasnike vozila (potrebno za padajući izbornik)
const mockOwners = [
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "John Doe", email: "john@example.com" },
  { id: 4, name: "Mike Johnson", email: "mike@example.com" },
  { id: 5, name: "Sarah Williams", email: "sarah@example.com" },
];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    registrationNumber: "",
    vin: "",
    owner_id: "",
    status: "active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVehicle({
      ...currentVehicle,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find selected owner for adding to the vehicle object
    const selectedOwner = mockOwners.find(
      (owner) => owner.id === parseInt(currentVehicle.owner_id)
    );

    if (currentVehicle.id) {
      // Update existing vehicle
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === currentVehicle.id
            ? {
                ...currentVehicle,
                owner: selectedOwner,
                year: parseInt(currentVehicle.year),
              }
            : vehicle
        )
      );
    } else {
      // Add new vehicle
      setVehicles([
        ...vehicles,
        {
          ...currentVehicle,
          id: Date.now(),
          year: parseInt(currentVehicle.year),
          owner: selectedOwner,
        },
      ]);
    }

    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentVehicle({
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      registrationNumber: "",
      vin: "",
      owner_id: "",
      status: "active",
    });
  };

  const handleEdit = (vehicle) => {
    setCurrentVehicle({
      id: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      registrationNumber: vehicle.registrationNumber,
      vin: vehicle.vin,
      owner_id: vehicle.owner.id.toString(),
      status: vehicle.status,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    }
  };

  // Filter vehicles based on search term and status filter
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesTerm =
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registrationNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || vehicle.status === statusFilter;

    return matchesTerm && matchesStatus;
  });

  return (
    <Layout>
      <div className="vehicles-container">
        <div className="page-header">
          <h2>Vehicle Management</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            Add New Vehicle
          </button>
        </div>

        <div className="filters-row">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search vehicles..."
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
          <div className="vehicle-form-container">
            <div className="card">
              <div className="card-header">
                <h3>
                  {currentVehicle.id ? "Edit Vehicle" : "Add New Vehicle"}
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={currentVehicle.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      value={currentVehicle.model}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      value={currentVehicle.year}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="registrationNumber">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      id="registrationNumber"
                      name="registrationNumber"
                      value={currentVehicle.registrationNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="vin">VIN</label>
                    <input
                      type="text"
                      id="vin"
                      name="vin"
                      value={currentVehicle.vin}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="owner_id">Owner</label>
                    <select
                      id="owner_id"
                      name="owner_id"
                      value={currentVehicle.owner_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Select Owner --</option>
                      {mockOwners.map((owner) => (
                        <option key={owner.id} value={owner.id}>
                          {owner.name} ({owner.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={currentVehicle.status}
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
                    {currentVehicle.id ? "Update Vehicle" : "Add Vehicle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="vehicles-table-container">
          {filteredVehicles.length === 0 ? (
            <div className="no-results">
              <p>No vehicles match your search criteria.</p>
            </div>
          ) : (
            <table className="vehicles-table">
              <thead>
                <tr>
                  <th>Registration</th>
                  <th>Brand & Model</th>
                  <th>Year</th>
                  <th>VIN</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className={
                      vehicle.status === "inactive" ? "inactive-row" : ""
                    }
                  >
                    <td>{vehicle.registrationNumber}</td>
                    <td>
                      {vehicle.brand} {vehicle.model}
                    </td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.vin}</td>
                    <td>{vehicle.owner.name}</td>
                    <td>
                      <span className={`status-badge ${vehicle.status}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleEdit(vehicle)}
                        title="Edit Vehicle"
                      >
                        Edit
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(vehicle.id)}
                        title="Delete Vehicle"
                      >
                        Delete
                      </button>
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

export default Vehicles;
