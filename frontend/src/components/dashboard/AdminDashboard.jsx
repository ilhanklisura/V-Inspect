// src/components/dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  mockUsers,
  vehiclesData,
  inspectionsData,
  stationsData,
  nextUserId,
  nextVehicleId,
  nextInspectionId,
  nextStationId,
} from "../../data/mockData";
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

  const refreshData = () => {
    setAllVehicles([...vehiclesData]);
    setAllInspections([...inspectionsData]);
    setAllUsers([...mockUsers]);
    setAllStations([...stationsData]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const deleteUser = (userId) => {
    const index = mockUsers.findIndex((u) => u.id === userId);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      refreshData();
    }
  };

  const deleteVehicle = (vehicleId) => {
    const index = vehiclesData.findIndex((v) => v.id === vehicleId);
    if (index !== -1) {
      vehiclesData.splice(index, 1);

      const inspectionIndexes = inspectionsData
        .map((insp, idx) => (insp.vehicle_id === vehicleId ? idx : -1))
        .filter((idx) => idx !== -1)
        .reverse();

      inspectionIndexes.forEach((idx) => inspectionsData.splice(idx, 1));
      refreshData();
    }
  };

  const deleteInspection = (inspectionId) => {
    const index = inspectionsData.findIndex((i) => i.id === inspectionId);
    if (index !== -1) {
      inspectionsData.splice(index, 1);
      refreshData();
    }
  };

  const deleteStation = (stationId) => {
    const index = stationsData.findIndex((s) => s.id === stationId);
    if (index !== -1) {
      stationsData.splice(index, 1);
      refreshData();
    }
  };

  const saveUser = (userData) => {
    if (userData.id) {
      const index = mockUsers.findIndex((u) => u.id === userData.id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...userData };
      }
    } else {
      const newUser = {
        ...userData,
        id: nextUserId++,
        created_at: new Date().toISOString().split("T")[0],
      };
      mockUsers.push(newUser);
    }
    setEditingUser(null);
    refreshData();
  };

  const saveVehicle = (vehicleData) => {
    if (vehicleData.id) {
      const index = vehiclesData.findIndex((v) => v.id === vehicleData.id);
      if (index !== -1) {
        vehiclesData[index] = { ...vehiclesData[index], ...vehicleData };
      }
    } else {
      const newVehicle = {
        ...vehicleData,
        id: nextVehicleId++,
        created_at: new Date().toISOString().split("T")[0],
      };
      vehiclesData.push(newVehicle);
    }
    setEditingVehicle(null);
    refreshData();
  };

  const saveInspection = (inspectionData) => {
    if (inspectionData.id) {
      const index = inspectionsData.findIndex(
        (i) => i.id === inspectionData.id
      );
      if (index !== -1) {
        inspectionsData[index] = {
          ...inspectionsData[index],
          ...inspectionData,
        };
      }
    } else {
      const newInspection = {
        ...inspectionData,
        id: nextInspectionId++,
        created_at: new Date().toISOString().split("T")[0],
      };
      inspectionsData.push(newInspection);
    }
    setEditingInspection(null);
    refreshData();
  };

  const saveStation = (stationData) => {
    if (stationData.id) {
      const index = stationsData.findIndex((s) => s.id === stationData.id);
      if (index !== -1) {
        stationsData[index] = { ...stationsData[index], ...stationData };
      }
    } else {
      const newStation = {
        ...stationData,
        id: nextStationId++,
        created_at: new Date().toISOString().split("T")[0],
      };
      stationsData.push(newStation);
    }
    setEditingStation(null);
    refreshData();
  };

  const totalUsers = allUsers.length;
  const totalVehicles = allVehicles.length;
  const totalInspections = allInspections.length;
  const totalStations = allStations.length;

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
              title="Inspection Stations"
              value={totalStations}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Inspections
                </h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {allInspections.slice(0, 10).map((inspection) => {
                  const vehicle = allVehicles.find(
                    (v) => v.id === inspection.vehicle_id
                  );
                  const station = allStations.find(
                    (s) => s.id === inspection.station_id
                  );
                  return (
                    <div key={inspection.id} className="px-6 py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {vehicle?.make} {vehicle?.model}
                          </p>
                          <p className="text-sm text-gray-500">
                            {station?.name}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            inspection.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {inspection.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Users
                </h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {allUsers.slice(0, 10).map((user) => (
                  <div key={user.id} className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {user.role.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
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
                    Created
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {user.role.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.created_at}
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
                    Inspector
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
                    Result
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
                  const inspector = allUsers.find(
                    (u) => u.id === inspection.inspector_id
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
                        {inspector?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {station?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {new Date(inspection.date).toLocaleDateString()}
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
                        {inspection.result && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              inspection.result === "passed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {inspection.result.toUpperCase()}
                          </span>
                        )}
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
                    Created
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
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {station.created_at}
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
