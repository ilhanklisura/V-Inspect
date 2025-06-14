import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { vehicleService } from "../../services/vehicleService";

const AddVehicleForm = ({ onSave, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    vin: "",
    year: new Date().getFullYear(),
    document_path: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.make.trim()) newErrors.make = "Make is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.vin.trim()) newErrors.vin = "VIN is required";
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = "Invalid year";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newVehicle = {
      owner_id: user.id,
      make: formData.make,
      model: formData.model,
      vin: formData.vin,
      year: parseInt(formData.year),
      document_path:
        formData.document_path || `/docs/${formData.make.toLowerCase()}.pdf`,
    };

    try {
      const createdVehicle = await vehicleService.createVehicle(newVehicle);
      onSave(createdVehicle);
    } catch (error) {
      console.error("Error creating vehicle:", error);
      setErrors({ submit: error.message || "Failed to create vehicle" });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Add New Vehicle
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Make
          </label>
          <input
            type="text"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Toyota"
          />
          {errors.make && (
            <p className="text-red-600 text-sm mt-1">{errors.make}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Corolla"
          />
          {errors.model && (
            <p className="text-red-600 text-sm mt-1">{errors.model}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            VIN
          </label>
          <input
            type="text"
            value={formData.vin}
            onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1HGBH41JXMN109186"
          />
          {errors.vin && (
            <p className="text-red-600 text-sm mt-1">{errors.vin}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1900"
            max={new Date().getFullYear() + 1}
          />
          {errors.year && (
            <p className="text-red-600 text-sm mt-1">{errors.year}</p>
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
          Save Vehicle
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

export default AddVehicleForm;
