import React, { useState, useEffect } from "react";
import { inspectionService } from "../../services/inspectionService";
import { stationService } from "../../services/stationService";

const ScheduleInspectionForm = ({ vehicles, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    vehicle_id: "",
    station_id: "",
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const stationsData = await stationService.getStations();
        setStations(stationsData);
      } catch (error) {
        console.error("Error loading stations:", error);
      }
    };
    loadStations();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vehicle_id) newErrors.vehicle_id = "Vehicle is required";
    if (!formData.station_id) newErrors.station_id = "Station is required";
    if (!formData.date) newErrors.date = "Date is required";
    else if (new Date(formData.date) < new Date()) {
      newErrors.date = "Date must be in the future";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newInspection = {
      vehicle_id: parseInt(formData.vehicle_id),
      station_id: parseInt(formData.station_id),
      date: formData.date,
      status: "scheduled",
    };

    try {
      const createdInspection = await inspectionService.createInspection(
        newInspection
      );
      onSave(createdInspection);
    } catch (error) {
      console.error("Error creating inspection:", error);
      setErrors({ submit: error.message || "Failed to schedule inspection" });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Schedule Inspection
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle
          </label>
          <select
            value={formData.vehicle_id}
            onChange={(e) =>
              setFormData({ ...formData, vehicle_id: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </option>
            ))}
          </select>
          {errors.vehicle_id && (
            <p className="text-red-600 text-sm mt-1">{errors.vehicle_id}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inspection Station
          </label>
          <select
            value={formData.station_id}
            onChange={(e) =>
              setFormData({ ...formData, station_id: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name} - {station.location}
              </option>
            ))}
          </select>
          {errors.station_id && (
            <p className="text-red-600 text-sm mt-1">{errors.station_id}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.date && (
            <p className="text-red-600 text-sm mt-1">{errors.date}</p>
          )}
        </div>
      </div>

      {errors.submit && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}

      <div className="flex space-x-3 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Schedule Inspection
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ScheduleInspectionForm;
