// src/pages/owner/MyVehicles.jsx
import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import "./MyVehicles.css";

// Mock podaci za vozila
const mockVehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2019,
    registrationNumber: "A12-B-345",
    vin: "JT2BF22K1W0123456",
    status: "active",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2020,
    registrationNumber: "E56-M-789",
    vin: "1HGCM82633A123456",
    status: "active",
  },
  {
    id: 3,
    brand: "Ford",
    model: "Focus",
    year: 2018,
    registrationNumber: "K78-C-910",
    vin: "1FAHP3K21CL123456",
    status: "inactive",
  },
];

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [showForm, setShowForm] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({
    brand: "",
    model: "",
    year: "",
    registrationNumber: "",
    vin: "",
  });

  // Kasnije će koristiti vehicleApi
  // useEffect(() => {
  //   const fetchVehicles = async () => {
  //     try {
  //       const response = await vehicleApi.getMyVehicles();
  //       setVehicles(response.data);
  //     } catch (error) {
  //       console.error('Error fetching vehicles:', error);
  //     }
  //   };
  //   fetchVehicles();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVehicle({
      ...currentVehicle,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentVehicle.id) {
      // Ažuriranje postojećeg vozila
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.id === currentVehicle.id ? currentVehicle : vehicle
        )
      );
    } else {
      // Dodavanje novog vozila
      setVehicles([
        ...vehicles,
        {
          ...currentVehicle,
          id: Date.now(), // Privremeni ID za mock
          status: "active",
        },
      ]);
    }

    // Reset forme
    setCurrentVehicle({
      brand: "",
      model: "",
      year: "",
      registrationNumber: "",
      vin: "",
    });
    setShowForm(false);
  };

  const handleEdit = (vehicle) => {
    setCurrentVehicle(vehicle);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    }
  };

  return (
    <Layout>
      <div className="my-vehicles-container">
        <div className="page-header">
          <h2>My Vehicles</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrentVehicle({
                brand: "",
                model: "",
                year: "",
                registrationNumber: "",
                vin: "",
              });
              setShowForm(true);
            }}
          >
            Add New Vehicle
          </button>
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
                    max={new Date().getFullYear()}
                    required
                  />
                </div>

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

                <div className="form-actions">
                  <button type="submit" className="btn btn-success">
                    {currentVehicle.id ? "Update Vehicle" : "Add Vehicle"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="vehicles-list">
          {vehicles.length === 0 ? (
            <p>You don't have any vehicles yet. Add your first vehicle!</p>
          ) : (
            vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`vehicle-card ${
                  vehicle.status === "inactive" ? "inactive" : ""
                }`}
              >
                <h3>
                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                </h3>
                <div className="vehicle-details">
                  <p>
                    <strong>Registration:</strong> {vehicle.registrationNumber}
                  </p>
                  <p>
                    <strong>VIN:</strong> {vehicle.vin}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status ${vehicle.status}`}>
                      {vehicle.status}
                    </span>
                  </p>
                </div>
                <div className="vehicle-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(vehicle)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(vehicle.id)}
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

export default MyVehicles;
