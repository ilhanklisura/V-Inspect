import React, { useState } from "react";

const StationEditForm = ({ station, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    station || {
      name: "",
      location: "",
    }
  );

  return (
    <div className="bg-gray-50 p-4 rounded border">
      <h4 className="font-semibold mb-3">
        {station ? "Edit Station" : "Add New Station"}
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Station Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
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

export default StationEditForm;
