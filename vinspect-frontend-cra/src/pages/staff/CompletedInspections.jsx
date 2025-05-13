// src/pages/staff/CompletedInspections.jsx
import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import "./CompletedInspections.css";

// Mock podaci za završene inspekcije
const mockInspections = [
  {
    id: 1,
    vehicle: {
      id: 1,
      brand: "Toyota",
      model: "Corolla",
      year: 2019,
      registrationNumber: "A12-B-345",
      owner: {
        id: 1,
        name: "Jane Smith",
        email: "jane@example.com",
      },
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
    },
    date: "2023-05-10T14:30:00",
    completedDate: "2023-05-10T15:15:00",
    status: "completed",
    result: "passed",
    notes:
      "Vehicle passed all inspection points. Brakes are in good condition.",
  },
  {
    id: 2,
    vehicle: {
      id: 3,
      brand: "Ford",
      model: "Focus",
      year: 2018,
      registrationNumber: "K78-C-910",
      owner: {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
      },
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
    },
    date: "2023-05-05T11:15:00",
    completedDate: "2023-05-05T12:00:00",
    status: "completed",
    result: "failed",
    notes:
      "Failed due to brake system issues. The brake pads are worn beyond acceptable limits. Exhaust emissions exceed permitted levels.",
  },
  {
    id: 3,
    vehicle: {
      id: 2,
      brand: "Honda",
      model: "Civic",
      year: 2020,
      registrationNumber: "E56-M-789",
      owner: {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
      },
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
    },
    date: "2023-05-01T10:00:00",
    completedDate: "2023-05-01T10:45:00",
    status: "completed",
    result: "passed",
    notes: "All components in good condition.",
  },
];

const CompletedInspections = () => {
  const [inspections, setInspections] = useState(mockInspections);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultFilter, setResultFilter] = useState("all");

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

  // Filter inspections based on search term and result filter
  const filteredInspections = inspections.filter((inspection) => {
    // Search term filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      inspection.vehicle.brand.toLowerCase().includes(searchLower) ||
      inspection.vehicle.model.toLowerCase().includes(searchLower) ||
      inspection.vehicle.registrationNumber
        .toLowerCase()
        .includes(searchLower) ||
      inspection.vehicle.owner.name.toLowerCase().includes(searchLower);

    // Result filter
    const matchesResult =
      resultFilter === "all" || inspection.result === resultFilter;

    return matchesSearch && matchesResult;
  });

  return (
    <Layout>
      <div className="completed-inspections-container">
        <h2>Completed Inspections</h2>

        <div className="filters-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by vehicle or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="result-filter">
            <label>Filter by result:</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${
                  resultFilter === "all" ? "active" : ""
                }`}
                onClick={() => setResultFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-btn passed ${
                  resultFilter === "passed" ? "active" : ""
                }`}
                onClick={() => setResultFilter("passed")}
              >
                Passed
              </button>
              <button
                className={`filter-btn failed ${
                  resultFilter === "failed" ? "active" : ""
                }`}
                onClick={() => setResultFilter("failed")}
              >
                Failed
              </button>
            </div>
          </div>
        </div>

        <div className="inspections-grid">
          {filteredInspections.length === 0 ? (
            <div className="no-results">
              <p>No inspections match your search criteria.</p>
            </div>
          ) : (
            filteredInspections.map((inspection) => (
              <div
                key={inspection.id}
                className={`inspection-card ${inspection.result}`}
                onClick={() => setSelectedInspection(inspection)}
              >
                <div className="card-header">
                  <h3>
                    {inspection.vehicle.brand} {inspection.vehicle.model}
                  </h3>
                  <span className={`result-badge ${inspection.result}`}>
                    {inspection.result}
                  </span>
                </div>

                <div className="card-info">
                  <p>
                    <strong>Reg:</strong>{" "}
                    {inspection.vehicle.registrationNumber}
                  </p>
                  <p>
                    <strong>Owner:</strong> {inspection.vehicle.owner.name}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {formatDate(inspection.completedDate)}
                  </p>
                </div>

                <div className="card-notes">
                  <p>
                    <strong>Notes:</strong> {inspection.notes}
                  </p>
                </div>

                <button className="view-details-btn">View Full Details</button>
              </div>
            ))
          )}
        </div>

        {selectedInspection && (
          <div
            className="inspection-modal-overlay"
            onClick={() => setSelectedInspection(null)}
          >
            <div
              className="inspection-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Inspection Details</h3>
                <button
                  className="close-btn"
                  onClick={() => setSelectedInspection(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-content">
                <div className="detail-section">
                  <h4>Vehicle Information</h4>
                  <div className="detail-row">
                    <span>Brand & Model:</span>
                    <span>
                      {selectedInspection.vehicle.brand}{" "}
                      {selectedInspection.vehicle.model}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Year:</span>
                    <span>{selectedInspection.vehicle.year}</span>
                  </div>
                  <div className="detail-row">
                    <span>Registration:</span>
                    <span>{selectedInspection.vehicle.registrationNumber}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Owner Information</h4>
                  <div className="detail-row">
                    <span>Name:</span>
                    <span>{selectedInspection.vehicle.owner.name}</span>
                  </div>
                  <div className="detail-row">
                    <span>Email:</span>
                    <span>{selectedInspection.vehicle.owner.email}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Inspection Information</h4>
                  <div className="detail-row">
                    <span>Scheduled Date:</span>
                    <span>{formatDate(selectedInspection.date)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Completed Date:</span>
                    <span>{formatDate(selectedInspection.completedDate)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Station:</span>
                    <span>{selectedInspection.station.name}</span>
                  </div>
                  <div className="detail-row">
                    <span>Result:</span>
                    <span
                      className={`result-text ${selectedInspection.result}`}
                    >
                      {selectedInspection.result.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Notes</h4>
                  <p className="notes-text">{selectedInspection.notes}</p>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => window.print()}
                  >
                    Print Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompletedInspections;
