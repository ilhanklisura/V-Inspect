import React, { useState, useEffect } from "react";
import { Plus, Calendar } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { vehicleService } from "../../services/vehicleService";
import { inspectionService } from "../../services/inspectionService";
import StatsCard from "../ui/StatsCard";
import AddVehicleForm from "../forms/AddVehicleForm";
import ScheduleInspectionForm from "../forms/ScheduleInspectionForm";

const VehicleOwnerDashboard = () => {
  const { user } = useAuth();
  const [userVehicles, setUserVehicles] = useState([]);
  const [userInspections, setUserInspections] = useState([]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showScheduleInspection, setShowScheduleInspection] = useState(false);

  const refreshData = async () => {
    try {
      // Load user's vehicles from API
      const vehicles = await vehicleService.getMyVehicles();
      setUserVehicles(vehicles);

      // Load user's inspections from API
      const userInspections = await inspectionService.getMyInspections();
      setUserInspections(userInspections);
    } catch (error) {
      console.error("Error loading data:", error);
      // Fallback to empty arrays if API fails
      setUserVehicles([]);
      setUserInspections([]);
    }
  };

  useEffect(() => {
    refreshData();
  }, [user.id]);

  const handleVehicleAdded = () => {
    refreshData();
    setShowAddVehicle(false);
  };

  const handleInspectionScheduled = () => {
    refreshData();
    setShowScheduleInspection(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
        <div className="space-x-3">
          <button
            onClick={() => setShowAddVehicle(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 inline-flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Vehicle</span>
          </button>
          <button
            onClick={() => setShowScheduleInspection(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 inline-flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule Inspection</span>
          </button>
        </div>
      </div>

      {showAddVehicle && (
        <div className="mb-8">
          <AddVehicleForm
            onSave={handleVehicleAdded}
            onCancel={() => setShowAddVehicle(false)}
          />
        </div>
      )}

      {showScheduleInspection && (
        <div className="mb-8">
          <ScheduleInspectionForm
            vehicles={userVehicles}
            onSave={handleInspectionScheduled}
            onCancel={() => setShowScheduleInspection(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Vehicles"
          value={userVehicles.length}
          color="blue"
        />
        <StatsCard
          title="Pending Inspections"
          value={userInspections.filter((i) => i.status === "scheduled").length}
          color="yellow"
        />
        <StatsCard
          title="Completed Inspections"
          value={userInspections.filter((i) => i.status === "completed").length}
          color="green"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Vehicles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VIN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userVehicles.map((vehicle) => {
                const inspection = userInspections.find(
                  (i) => i.vehicle_id === vehicle.id
                );
                return (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {vehicle.make} {vehicle.model}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.vin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {vehicle.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {inspection ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            inspection.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {inspection.status === "completed"
                            ? "Inspected"
                            : "Scheduled"}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          No Inspection
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleOwnerDashboard;
