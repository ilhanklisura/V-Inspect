import React, { useState } from "react";

const UserEditForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    user || {
      name: "",
      email: "",
      password: "",
      role: "vehicle_owner",
    }
  );

  return (
    <div className="bg-gray-50 p-4 rounded border">
      <h4 className="font-semibold mb-3">
        {user ? "Edit User" : "Add New User"}
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="px-3 py-2 border rounded"
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="px-3 py-2 border rounded"
        >
          <option value="vehicle_owner">Vehicle Owner</option>
          <option value="inspection_staff">Inspection Staff</option>
          <option value="admin">Admin</option>
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

export default UserEditForm;
