// src/pages/owner/MyInspections.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import "./MyInspections.css";

// Mock podaci za inspekcije
const mockInspections = [
  {
    id: 1,
    vehicle: {
      id: 1,
      brand: "Toyota",
      model: "Corolla",
      year: 2019,
      registrationNumber: "A12-B-345",
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
      address: "123 Main St, Sarajevo",
    },
    date: "2023-05-15T14:30:00",
    status: "completed",
    result: "passed",
    notes: "Vehicle passed all inspection points.",
  },
  {
    id: 2,
    vehicle: {
      id: 2,
      brand: "Honda",
      model: "Civic",
      year: 2020,
      registrationNumber: "E56-M-789",
    },
    station: {
      id: 2,
      name: "Northern Vehicle Inspection",
      address: "456 Oak Ave, Tuzla",
    },
    date: "2023-06-20T10:00:00",
    status: "scheduled",
    result: null,
    notes: null,
  },
  {
    id: 3,
    vehicle: {
      id: 1,
      brand: "Toyota",
      model: "Corolla",
      year: 2019,
      registrationNumber: "A12-B-345",
    },
    station: {
      id: 3,
      name: "Eastern Inspection Point",
      address: "789 Pine Rd, Zenica",
    },
    date: "2023-04-10T11:15:00",
    status: "completed",
    result: "failed",
    notes: "Failed due to brake system issues and excessive emissions.",
  },
];

const MyInspections = () => {
  const [inspections, setInspections] = useState(mockInspections);
  const [filter, setFilter] = useState("all");

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredInspections =
    filter === "all"
      ? inspections
      : inspections.filter((inspection) => inspection.status === filter);

  const handleCancelInspection = (id) => {
    if (window.confirm("Are you sure you want to cancel this inspection?")) {
      // Would call API in production
      // In mock, just update state
      setInspections(
        inspections.map((inspection) =>
          inspection.id === id
            ? { ...inspection, status: "cancelled" }
            : inspection
        )
      );
    }
  };

  return (
    <Layout>
      <div className="my-inspections-container">
        <div className="page-header">
          <h2>My Inspections</h2>
          <Link to="/schedule-inspection" className="btn btn-primary">
            Schedule New Inspection
          </Link>
        </div>

        <div className="filter-controls">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "scheduled" ? "active" : ""}`}
            onClick={() => setFilter("scheduled")}
          >
            Scheduled
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === "cancelled" ? "active" : ""}`}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>

        {filteredInspections.length === 0 ? (
          <div className="no-inspections">
            <p>No inspections found for the selected filter.</p>
          </div>
        ) : (
          <div className="inspections-list">
            {filteredInspections.map((inspection) => (
              <div
                key={inspection.id}
                className={`inspection-card status-${inspection.status}`}
              >
                <div className="inspection-header">
                  <h3>
                    {inspection.vehicle.brand} {inspection.vehicle.model} -{" "}
                    {inspection.vehicle.registrationNumber}
                  </h3>
                  <span className={`status-badge ${inspection.status}`}>
                    {inspection.status}
                  </span>
                </div>

                <div className="inspection-details">
                  <div className="detail-group">
                    <span className="detail-label">Station:</span>
                    <span className="detail-value">
                      {inspection.station.name}
                    </span>
                  </div>

                  <div className="detail-group">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">
                      {inspection.station.address}
                    </span>
                  </div>

                  <div className="detail-group">
                    <span className="detail-label">Date & Time:</span>
                    <span className="detail-value">
                      {formatDate(inspection.date)}
                    </span>
                  </div>

                  {inspection.result && (
                    <div className="detail-group">
                      <span className="detail-label">Result:</span>
                      <span
                        className={`detail-value result ${inspection.result}`}
                      >
                        {inspection.result}
                      </span>
                    </div>
                  )}

                  {inspection.notes && (
                    <div className="detail-group notes">
                      <span className="detail-label">Notes:</span>
                      <span className="detail-value">{inspection.notes}</span>
                    </div>
                  )}
                </div>

                <div className="inspection-actions">
                  {inspection.status === "scheduled" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelInspection(inspection.id)}
                    >
                      Cancel Inspection
                    </button>
                  )}

                  {inspection.status === "completed" &&
                    inspection.result === "failed" && (
                      <Link
                        to="/schedule-inspection"
                        className="btn btn-primary"
                        state={{ vehicleId: inspection.vehicle.id }}
                      >
                        Reschedule Inspection
                      </Link>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyInspections;
