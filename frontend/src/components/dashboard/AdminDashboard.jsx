import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { userService } from "../../services/userService";
import { vehicleService } from "../../services/vehicleService";
import { inspectionService } from "../../services/inspectionService";
import { stationService } from "../../services/stationService";
import StatsCard from "../ui/StatsCard";
import UserEditForm from "../forms/UserEditForm";
import VehicleEditForm from "../forms/VehicleEditForm";
import InspectionEditForm from "../forms/InspectionEditForm";
import StationEditForm from "../forms/StationEditForm";

const AdminDashboard = () => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [allInspections, setAllInspections] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingUser, setEditingUser] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [editingInspection, setEditingInspection] = useState(null);
  const [editingStation, setEditingStation] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      setLoading(true);
      const [vehicles, inspections, users, stations] = await Promise.all([
        vehicleService.getVehicles(),
        inspectionService.getInspections(),
        userService.getUsers(),
        stationService.getStations(),
      ]);

      setAllVehicles(vehicles);
      setAllInspections(inspections);
      setAllUsers(users);
      setAllStations(stations);
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      refreshData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteVehicle = async (vehicleId) => {
    try {
      await vehicleService.deleteVehicle(vehicleId);
      refreshData();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const deleteInspection = async (inspectionId) => {
    try {
      await inspectionService.deleteInspection(inspectionId);
      refreshData();
    } catch (error) {
      console.error("Error deleting inspection:", error);
    }
  };

  const deleteStation = async (stationId) => {
    try {
      await stationService.deleteStation(stationId);
      refreshData();
    } catch (error) {
      console.error("Error deleting station:", error);
    }
  };

  const saveUser = async (userData) => {
    try {
      if (userData.id) {
        await userService.updateUser(userData.id, userData);
      } else {
        await userService.createUser(userData);
      }
      setEditingUser(null);
      refreshData();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const saveVehicle = async (vehicleData) => {
    try {
      if (vehicleData.id) {
        await vehicleService.updateVehicle(vehicleData.id, vehicleData);
      } else {
        await vehicleService.createVehicle(vehicleData);
      }
      setEditingVehicle(null);
      refreshData();
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
  };

  const saveInspection = async (inspectionData) => {
    try {
      if (inspectionData.id) {
        await inspectionService.updateInspection(
          inspectionData.id,
          inspectionData
        );
      } else {
        await inspectionService.createInspection(inspectionData);
      }
      setEditingInspection(null);
      refreshData();
    } catch (error) {
      console.error("Error saving inspection:", error);
    }
  };

  const saveStation = async (stationData) => {
    try {
      if (stationData.id) {
        await stationService.updateStation(stationData.id, stationData);
      } else {
        await stationService.createStation(stationData);
      }
      setEditingStation(null);
      refreshData();
    } catch (error) {
      console.error("Error saving station:", error);
    }
  };

  const totalUsers = allUsers.length;
  const totalVehicles = allVehicles.length;
  const totalInspections = allInspections.length;
  const totalStations = allStations.length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {["overview", "users", "vehicles", "inspections", "stations"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </nav>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Users" value={totalUsers} color="blue" />
            <StatsCard
              title="Total Vehicles"
              value={totalVehicles}
              color="green"
            />
            <StatsCard
              title="Total Inspections"
              value={totalInspections}
              color="yellow"
            />
            <StatsCard
              title="Total Stations"
              value={totalStations}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Vehicles
              </h3>
              <div className="space-y-3">
                {allVehicles.slice(0, 5).map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <span className="font-medium">
                      {vehicle.make} {vehicle.model}
                    </span>
                    <span className="text-sm text-gray-500">
                      {vehicle.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Inspections
              </h3>
              <div className="space-y-3">
                {allInspections.slice(0, 5).map((inspection) => {
                  const vehicle = allVehicles.find(
                    (v) => v.id === inspection.vehicle_id
                  );
                  return (
                    <div
                      key={inspection.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="font-medium">
                        {vehicle
                          ? `${vehicle.make} ${vehicle.model}`
                          : "Unknown Vehicle"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          inspection.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {inspection.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "users" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Users
            </h2>
            <button
              onClick={() => setEditingUser({})}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add User</span>
            </button>
          </div>

          {editingUser && (
            <div className="p-6 border-b">
              <UserEditForm
                user={editingUser}
                onSave={saveUser}
                onCancel={() => setEditingUser(null)}
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "vehicles" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Vehicles
            </h2>
            <button
              onClick={() => setEditingVehicle({})}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Vehicle</span>
            </button>
          </div>

          {editingVehicle && (
            <div className="p-6 border-b">
              <VehicleEditForm
                vehicle={editingVehicle}
                users={allUsers}
                onSave={saveVehicle}
                onCancel={() => setEditingVehicle(null)}
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    VIN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allVehicles.map((vehicle) => {
                  const owner = allUsers.find((u) => u.id === vehicle.owner_id);
                  return (
                    <tr key={vehicle.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {vehicle.make} {vehicle.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {vehicle.vin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {vehicle.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {owner?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingVehicle(vehicle)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteVehicle(vehicle.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "inspections" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Inspections
            </h2>
            <button
              onClick={() => setEditingInspection({})}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Inspection</span>
            </button>
          </div>

          {editingInspection && (
            <div className="p-6 border-b">
              <InspectionEditForm
                inspection={editingInspection}
                vehicles={allVehicles}
                stations={allStations}
                users={allUsers}
                onSave={saveInspection}
                onCancel={() => setEditingInspection(null)}
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Station
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allInspections.map((inspection) => {
                  const vehicle = allVehicles.find(
                    (v) => v.id === inspection.vehicle_id
                  );
                  const station = allStations.find(
                    (s) => s.id === inspection.station_id
                  );
                  return (
                    <tr key={inspection.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {vehicle
                          ? `${vehicle.make} ${vehicle.model}`
                          : "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {station?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {inspection.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            inspection.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {inspection.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingInspection(inspection)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteInspection(inspection.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "stations" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Stations
            </h2>
            <button
              onClick={() => setEditingStation({})}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Station</span>
            </button>
          </div>

          {editingStation && (
            <div className="p-6 border-b">
              <StationEditForm
                station={editingStation}
                onSave={saveStation}
                onCancel={() => setEditingStation(null)}
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allStations.map((station) => (
                  <tr key={station.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {station.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {station.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingStation(station)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteStation(station.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
