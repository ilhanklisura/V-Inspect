// src/pages/admin/Inspections.jsx
import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import "./Inspections.css";

// Mock podaci za inspekcije
const mockInspections = [
  {
    id: 1,
    vehicle: {
      id: 1,
      brand: "Toyota",
      model: "Corolla",
      registrationNumber: "A12-B-345",
      owner: {
        id: 2,
        name: "Jane Smith",
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
    notes: "Vehicle passed all inspection points.",
  },
  {
    id: 2,
    vehicle: {
      id: 3,
      brand: "Ford",
      model: "Focus",
      registrationNumber: "K78-C-910",
      owner: {
        id: 3,
        name: "John Doe",
      },
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
    },
    date: "2023-05-15T11:15:00",
    completedDate: "2023-05-15T12:00:00",
    status: "completed",
    result: "failed",
    notes: "Failed due to brake system issues.",
  },
  {
    id: 3,
    vehicle: {
      id: 2,
      brand: "Honda",
      model: "Civic",
      registrationNumber: "E56-M-789",
      owner: {
        id: 2,
        name: "Jane Smith",
      },
    },
    station: {
      id: 2,
      name: "Northern Vehicle Inspection",
    },
    date: "2023-05-20T10:00:00",
    completedDate: null,
    status: "scheduled",
    result: null,
    notes: null,
  },
  {
    id: 4,
    vehicle: {
      id: 5,
      brand: "BMW",
      model: "320i",
      registrationNumber: "T12-U-345",
      owner: {
        id: 4,
        name: "Mike Johnson",
      },
    },
    station: {
      id: 3,
      name: "Eastern Inspection Point",
    },
    date: "2023-05-22T15:30:00",
    completedDate: null,
    status: "scheduled",
    result: null,
    notes: null,
  },
  {
    id: 5,
    vehicle: {
      id: 4,
      brand: "Volkswagen",
      model: "Golf",
      registrationNumber: "P34-Q-567",
      owner: {
        id: 3,
        name: "John Doe",
      },
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
    },
    date: "2023-05-05T09:45:00",
    completedDate: "2023-05-05T10:30:00",
    status: "cancelled",
    result: null,
    notes: "Cancelled by vehicle owner.",
  },
];

const Inspections = () => {
  const [inspections, setInspections] = useState(mockInspections);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const [selectedInspection, setSelectedInspection] = useState(null);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter inspections
  const filteredInspections = inspections.filter((inspection) => {
    // Search term filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      inspection.vehicle.brand.toLowerCase().includes(searchLower) ||
      inspection.vehicle.model.toLowerCase().includes(searchLower) ||
      inspection.vehicle.registrationNumber
        .toLowerCase()
        .includes(searchLower) ||
      inspection.vehicle.owner.name.toLowerCase().includes(searchLower) ||
      inspection.station.name.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus =
      statusFilter === "all" || inspection.status === statusFilter;

    // Result filter
    const matchesResult =
      resultFilter === "all" ||
      inspection.result === resultFilter ||
      (resultFilter === "none" && !inspection.result);

    return matchesSearch && matchesStatus && matchesResult;
  });

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this inspection record?")
    ) {
      setInspections(inspections.filter((inspection) => inspection.id !== id));
    }
  };

  const handleViewDetails = (inspection) => {
    setSelectedInspection(inspection);
  };

  return (
    <Layout>
      <div className="inspections-container">
        <h2>All Inspections</h2>

        <div className="filters-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search inspections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${
                  statusFilter === "all" ? "active" : ""
                }`}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-btn scheduled ${
                  statusFilter === "scheduled" ? "active" : ""
                }`}
                onClick={() => setStatusFilter("scheduled")}
              >
                Scheduled
              </button>
              <button
                className={`filter-btn completed ${
                  statusFilter === "completed" ? "active" : ""
                }`}
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </button>
              <button
                className={`filter-btn cancelled ${
                  statusFilter === "cancelled" ? "active" : ""
                }`}
                onClick={() => setStatusFilter("cancelled")}
              >
                Cancelled
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Result:</label>
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
              <button
                className={`filter-btn none ${
                  resultFilter === "none" ? "active" : ""
                }`}
                onClick={() => setResultFilter("none")}
              >
                No Result
              </button>
            </div>
          </div>
        </div>

        <div className="inspections-table-container">
          {filteredInspections.length === 0 ? (
            <div className="no-results">
              <p>No inspections match your search criteria.</p>
            </div>
          ) : (
            <table className="inspections-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Owner</th>
                  <th>Station</th>
                  <th>Scheduled Date</th>
                  <th>Status</th>
                  <th>Result</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInspections.map((inspection) => (
                  <tr
                    key={inspection.id}
                    className={`status-${inspection.status}`}
                  >
                    <td>{inspection.id}</td>
                    <td>
                      {inspection.vehicle.brand} {inspection.vehicle.model} (
                      {inspection.vehicle.registrationNumber})
                    </td>
                    <td>{inspection.vehicle.owner.name}</td>
                    <td>{inspection.station.name}</td>
                    <td>{formatDate(inspection.date)}</td>
                    <td>
                      <span className={`status-badge ${inspection.status}`}>
                        {inspection.status}
                      </span>
                    </td>
                    <td>
                      {inspection.result ? (
                        <span className={`result-badge ${inspection.result}`}>
                          {inspection.result}
                        </span>
                      ) : (
                        <span className="result-badge none">None</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-action btn-view"
                        onClick={() => handleViewDetails(inspection)}
                        title="View Details"
                      >
                        View
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(inspection.id)}
                        title="Delete Inspection"
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
                </div>

                <div className="detail-section">
                  <h4>Inspection Information</h4>
                  <div className="detail-row">
                    <span>Station:</span>
                    <span>{selectedInspection.station.name}</span>
                  </div>
                  <div className="detail-row">
                    <span>Scheduled Date:</span>
                    <span>{formatDate(selectedInspection.date)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Completed Date:</span>
                    <span>{formatDate(selectedInspection.completedDate)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Status:</span>
                    <span
                      className={`status-text ${selectedInspection.status}`}
                    >
                      {selectedInspection.status}
                    </span>
                  </div>
                  {selectedInspection.result && (
                    <div className="detail-row">
                      <span>Result:</span>
                      <span
                        className={`result-text ${selectedInspection.result}`}
                      >
                        {selectedInspection.result}
                      </span>
                    </div>
                  )}
                </div>

                {selectedInspection.notes && (
                  <div className="detail-section">
                    <h4>Notes</h4>
                    <p className="notes-text">{selectedInspection.notes}</p>
                  </div>
                )}

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

export default Inspections;
