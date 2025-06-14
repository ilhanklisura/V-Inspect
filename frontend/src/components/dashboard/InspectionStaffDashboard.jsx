import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { inspectionService } from "../../services/inspectionService";
import { vehicleService } from "../../services/vehicleService";
import { stationService } from "../../services/stationService";
import StatsCard from "../ui/StatsCard";

const InspectionStaffDashboard = () => {
  const { user } = useAuth();
  const [assignedInspections, setAssignedInspections] = useState([]);
  const [inspectionVehicles, setInspectionVehicles] = useState([]);

  const refreshData = async () => {
    try {
      // Get all inspections (inspection staff can see all)
      const inspections = await inspectionService.getInspections();
      setAssignedInspections(inspections);

      // Get vehicles and stations data for each inspection
      const vehicles = await vehicleService.getVehicles();
      const stations = await stationService.getStations();

      const inspectionVehicles = inspections.map((inspection) => ({
        ...inspection,
        vehicle: vehicles.find((v) => v.id === inspection.vehicle_id),
        station: stations.find((s) => s.id === inspection.station_id),
      }));

      setInspectionVehicles(inspectionVehicles);
    } catch (error) {
      console.error("Error loading inspection data:", error);
      setAssignedInspections([]);
      setInspectionVehicles([]);
    }
  };

  useEffect(() => {
    refreshData();
  }, [user.id]);

  const completeInspection = async (inspectionId, result) => {
    try {
      await inspectionService.updateInspection(inspectionId, {
        status: "completed",
        result: result,
      });
      refreshData(); // Refresh data after update
    } catch (error) {
      console.error("Error completing inspection:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Assigned Inspections
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Assigned"
          value={assignedInspections.length}
          color="blue"
        />
        <StatsCard
          title="Pending"
          value={
            assignedInspections.filter((i) => i.status === "scheduled").length
          }
          color="yellow"
        />
        <StatsCard
          title="Completed"
          value={
            assignedInspections.filter((i) => i.status === "completed").length
          }
          color="green"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Inspection Schedule
          </h2>
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
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inspectionVehicles.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {item.vehicle.make} {item.vehicle.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.vehicle.vin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.station.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.status === "scheduled" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => completeInspection(item.id, "passed")}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Pass
                        </button>
                        <button
                          onClick={() => completeInspection(item.id, "failed")}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                        >
                          Fail
                        </button>
                      </div>
                    )}
                    {item.status === "completed" && (
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.result === "passed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.result?.toUpperCase()}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InspectionStaffDashboard;
