// src/pages/owner/ScheduleInspection.jsx
import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import "./ScheduleInspection.css";

// Mock podaci za vozila i stanice
const mockVehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2019,
    registrationNumber: "A12-B-345",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2020,
    registrationNumber: "E56-M-789",
  },
  {
    id: 3,
    brand: "Ford",
    model: "Focus",
    year: 2018,
    registrationNumber: "K78-C-910",
  },
];

const mockStations = [
  {
    id: 1,
    name: "Central Inspection Center",
    address: "123 Main St, Sarajevo",
    availability: "High",
  },
  {
    id: 2,
    name: "Northern Vehicle Inspection",
    address: "456 Oak Ave, Tuzla",
    availability: "Medium",
  },
  {
    id: 3,
    name: "Eastern Inspection Point",
    address: "789 Pine Rd, Zenica",
    availability: "Low",
  },
];

const ScheduleInspection = () => {
  const [formData, setFormData] = useState({
    vehicle_id: "",
    station_id: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Format date and time for API
      const inspectionData = {
        ...formData,
        date: `${formData.date}T${formData.time}:00`, // ISO format
      };

      // Mock API call - would use actual API in production
      // await inspectionApi.scheduleInspection(inspectionData);

      console.log("Scheduling inspection with data:", inspectionData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Inspection scheduled successfully!");
      setFormData({
        vehicle_id: "",
        station_id: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error scheduling inspection:", error);
      setErrorMessage("Failed to schedule inspection. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date for minimum date input
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Layout>
      <div className="schedule-inspection-container">
        <h2>Schedule Vehicle Inspection</h2>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="vehicle_id">Select Vehicle</label>
              <select
                id="vehicle_id"
                name="vehicle_id"
                value={formData.vehicle_id}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select Your Vehicle --</option>
                {mockVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.brand} {vehicle.model} ({vehicle.year}) -{" "}
                    {vehicle.registrationNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="station_id">Select Inspection Station</label>
              <select
                id="station_id"
                name="station_id"
                value={formData.station_id}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select Inspection Station --</option>
                {mockStations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name} - {station.address} (Availability:{" "}
                    {station.availability})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={minDate}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Scheduling..." : "Schedule Inspection"}
              </button>
            </div>
          </form>
        </div>

        <div className="info-section">
          <h3>Inspection Details</h3>
          <p>
            A standard vehicle inspection includes checking the following
            components:
          </p>
          <ul>
            <li>Brakes and brake system</li>
            <li>Steering and suspension</li>
            <li>Tires and wheels</li>
            <li>Lights and signals</li>
            <li>Exhaust system</li>
            <li>Glass and mirrors</li>
            <li>Vehicle identification</li>
            <li>Emission testing</li>
          </ul>
          <p>
            The inspection typically takes 30-60 minutes. Please arrive 10
            minutes before your scheduled time.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleInspection;
