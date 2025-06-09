// src/data/mockData.js

export let mockUsers = [
  {
    id: 1,
    email: "owner@test.com",
    password: "password",
    name: "John Doe",
    role: "vehicle_owner",
    created_at: "2024-01-01",
  },
  {
    id: 2,
    email: "inspector@test.com",
    password: "password",
    name: "Jane Smith",
    role: "inspection_staff",
    created_at: "2024-01-01",
  },
  {
    id: 3,
    email: "admin@test.com",
    password: "password",
    name: "Admin User",
    role: "admin",
    created_at: "2024-01-01",
  },
];

export let nextUserId = 4;

export const mockVehicles = [
  {
    id: 1,
    owner_id: 1,
    make: "Toyota",
    model: "Corolla",
    vin: "1HGBH41JXMN109186",
    year: 2020,
    document_path: "/docs/toyota.pdf",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    owner_id: 1,
    make: "Honda",
    model: "Civic",
    vin: "2HGFA16526H123456",
    year: 2019,
    document_path: "/docs/honda.pdf",
    created_at: "2024-02-20",
  },
];

export const mockInspections = [
  {
    id: 1,
    vehicle_id: 1,
    station_id: 1,
    inspector_id: 2,
    date: "2024-06-15",
    status: "scheduled",
    result: null,
    created_at: "2024-06-01",
  },
  {
    id: 2,
    vehicle_id: 2,
    station_id: 1,
    inspector_id: 2,
    date: "2024-06-10",
    status: "completed",
    result: "passed",
    created_at: "2024-05-25",
  },
];

export const mockStations = [
  {
    id: 1,
    name: "Downtown Inspection Center",
    location: "Main Street 123",
    created_at: "2024-01-01",
  },
  {
    id: 2,
    name: "North Side Station",
    location: "North Ave 456",
    created_at: "2024-01-01",
  },
];

// Export mutable arrays for CRUD operations
export let vehiclesData = [...mockVehicles];
export let inspectionsData = [...mockInspections];
export let stationsData = [...mockStations];
export let nextVehicleId = 3;
export let nextInspectionId = 3;
export let nextStationId = 3;
