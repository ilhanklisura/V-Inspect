// src/components/forms/VehicleEditForm.jsx
import React, { useState } from "react";
import { mockUsers } from "../../data/mockData";

const VehicleEditForm = ({ vehicle, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    vehicle || {
      make: "",
      model: "",
      vin: "",
      year: new Date().getFullYear(),
      owner_id: "",
      document_path: "",
    }
  );

  return (
    <div className="bg-gray-50 p-4 rounded border">
      <h4 className="font-semibold mb-3">
        {vehicle ? "Edit Vehicle" : "Add New Vehicle"}
      </h4>
      <div className="grid grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Make"
          value={formData.make}
          onChange={(e) => setFormData({ ...formData, make: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Model"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="VIN"
          value={formData.vin}
          onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={(e) =>
            setFormData({ ...formData, year: parseInt(e.target.value) })
          }
          className="px-3 py-2 border rounded"
        />
        <select
          value={formData.owner_id}
          onChange={(e) =>
            setFormData({ ...formData, owner_id: parseInt(e.target.value) })
          }
          className="px-3 py-2 border rounded"
        >
          <option value="">Select Owner</option>
          {mockUsers
            .filter((u) => u.role === "vehicle_owner")
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Document Path"
          value={formData.document_path}
          onChange={(e) =>
            setFormData({ ...formData, document_path: e.target.value })
          }
          className="px-3 py-2 border rounded"
        />
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

export default VehicleEditForm;
