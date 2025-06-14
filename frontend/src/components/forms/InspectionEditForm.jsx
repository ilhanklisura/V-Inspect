import React, { useState } from "react";

const InspectionEditForm = ({
  inspection,
  vehicles = [],
  stations = [],
  users = [],
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState(
    inspection || {
      vehicle_id: "",
      station_id: "",
      inspector_id: "",
      date: "",
      status: "scheduled",
      result: "",
    }
  );

  return (
    <div className="bg-gray-50 p-4 rounded border">
      <h4 className="font-semibold mb-3">
        {inspection ? "Edit Inspection" : "Add New Inspection"}
      </h4>
      <div className="grid grid-cols-3 gap-3">
        <select
          value={formData.vehicle_id}
          onChange={(e) =>
            setFormData({ ...formData, vehicle_id: parseInt(e.target.value) })
          }
          className="px-3 py-2 border rounded"
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </option>
          ))}
        </select>
        <select
          value={formData.station_id}
          onChange={(e) =>
            setFormData({ ...formData, station_id: parseInt(e.target.value) })
          }
          className="px-3 py-2 border rounded"
        >
          <option value="">Select Station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
        <select
          value={formData.inspector_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              inspector_id: parseInt(e.target.value),
            })
          }
          className="px-3 py-2 border rounded"
        >
          <option value="">Select Inspector</option>
          {users
            .filter((u) => u.role === "inspection_staff")
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="px-3 py-2 border rounded"
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={formData.result || ""}
          onChange={(e) =>
            setFormData({ ...formData, result: e.target.value || null })
          }
          className="px-3 py-2 border rounded"
        >
          <option value="">No Result</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      <div className="flex space-x-2 mt-3">
        <button
          onClick={() => onSave(formData)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InspectionEditForm;
