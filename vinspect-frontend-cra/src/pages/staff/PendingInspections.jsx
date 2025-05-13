// src/pages/staff/PendingInspections.jsx
import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import "./PendingInspections.css";

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
      owner: {
        id: 1,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "123-456-7890",
      },
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
      address: "123 Main St, Sarajevo",
    },
    date: "2023-05-15T14:30:00",
    status: "scheduled",
    notes: null,
  },
  {
    id: 2,
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
        phone: "098-765-4321",
      },
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
      address: "123 Main St, Sarajevo",
    },
    date: "2023-05-15T16:00:00",
    status: "scheduled",
    notes: "Second inspection for the day.",
  },
  {
    id: 3,
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
        phone: "555-123-4567",
      },
    },
    station: {
      id: 1,
      name: "Central Inspection Center",
      address: "123 Main St, Sarajevo",
    },
    date: "2023-05-16T10:15:00",
    status: "scheduled",
    notes: "Previous inspection failed. Check brake system carefully.",
  },
];

const PendingInspections = () => {
  const [inspections, setInspections] = useState(mockInspections);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    status: "completed",
    result: "passed",
    notes: "",
  });

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

  const handleInspectionSelect = (inspection) => {
    setSelectedInspection(inspection);
    setFormData({
      status: "completed",
      result: "passed",
      notes: inspection.notes || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedInspection) return;

    setIsProcessing(true);

    try {
      // In production, would call API
      // await inspectionApi.updateInspection(selectedInspection.id, formData);

      // Mock API call
      console.log("Updating inspection:", selectedInspection.id, formData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      setInspections(
        inspections.map((inspection) =>
          inspection.id === selectedInspection.id
            ? {
                ...inspection,
                status: formData.status,
                result: formData.result,
                notes: formData.notes,
              }
            : inspection
        )
      );

      // Clear selection
      setSelectedInspection(null);
    } catch (error) {
      console.error("Error updating inspection:", error);
      alert("Failed to update inspection. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter only scheduled inspections
  const pendingInspections = inspections.filter(
    (inspection) => inspection.status === "scheduled"
  );

  return (
    <Layout>
      <div className="pending-inspections-container">
        <h2>Pending Inspections</h2>

        <div className="inspections-content">
          <div className="inspections-list-container">
            {pendingInspections.length === 0 ? (
              <div className="no-inspections">
                <p>No pending inspections found.</p>
              </div>
            ) : (
              <div className="inspections-list">
                {pendingInspections.map((inspection) => (
                  <div
                    key={inspection.id}
                    className={`inspection-item ${
                      selectedInspection?.id === inspection.id ? "selected" : ""
                    }`}
                    onClick={() => handleInspectionSelect(inspection)}
                  >
                    <div className="inspection-time">
                      {new Date(inspection.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="inspection-info">
                      <h4>
                        {inspection.vehicle.brand} {inspection.vehicle.model}
                      </h4>
                      <p>Reg: {inspection.vehicle.registrationNumber}</p>
                      <p className="owner-name">
                        {inspection.vehicle.owner.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="inspection-details-container">
            {selectedInspection ? (
              <div className="inspection-details">
                <h3>Inspection Details</h3>

                <div className="details-section">
                  <h4>Vehicle Information</h4>
                  <div className="detail-item">
                    <span>Brand:</span>
                    <span>{selectedInspection.vehicle.brand}</span>
                  </div>
                  <div className="detail-item">
                    <span>Model:</span>
                    <span>{selectedInspection.vehicle.model}</span>
                  </div>
                  <div className="detail-item">
                    <span>Year:</span>
                    <span>{selectedInspection.vehicle.year}</span>
                  </div>
                  <div className="detail-item">
                    <span>Registration:</span>
                    <span>{selectedInspection.vehicle.registrationNumber}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Owner Information</h4>
                  <div className="detail-item">
                    <span>Name:</span>
                    <span>{selectedInspection.vehicle.owner.name}</span>
                  </div>
                  <div className="detail-item">
                    <span>Email:</span>
                    <span>{selectedInspection.vehicle.owner.email}</span>
                  </div>
                  <div className="detail-item">
                    <span>Phone:</span>
                    <span>{selectedInspection.vehicle.owner.phone}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Appointment Details</h4>
                  <div className="detail-item">
                    <span>Date & Time:</span>
                    <span>{formatDate(selectedInspection.date)}</span>
                  </div>
                  <div className="detail-item">
                    <span>Station:</span>
                    <span>{selectedInspection.station.name}</span>
                  </div>
                  <div className="detail-item">
                    <span>Address:</span>
                    <span>{selectedInspection.station.address}</span>
                  </div>
                  {selectedInspection.notes && (
                    <div className="detail-item">
                      <span>Notes:</span>
                      <span>{selectedInspection.notes}</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="inspection-form">
                  <h4>Complete Inspection</h4>

                  <div className="form-group">
                    <label>Inspection Result</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="result"
                          value="passed"
                          checked={formData.result === "passed"}
                          onChange={handleInputChange}
                        />
                        Passed
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="result"
                          value="failed"
                          checked={formData.result === "failed"}
                          onChange={handleInputChange}
                        />
                        Failed
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes">Inspection Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Enter inspection details, findings, or issues..."
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedInspection(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Complete Inspection"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="no-selection">
                <p>Select an inspection from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PendingInspections;
