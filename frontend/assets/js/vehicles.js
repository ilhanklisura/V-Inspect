// Globalni objekt za upravljanje vozilima
const VehicleManager = {
  // Dohvati sva vozila (admin)
  getAllVehicles: async function () {
    try {
      return await api.getVehicles();
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      showNotification("Greška prilikom učitavanja vozila", "error");
      return [];
    }
  },

  // Dohvati vozila trenutnog korisnika (vlasnik vozila)
  getMyVehicles: async function () {
    try {
      return await api.getMyVehicles();
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      showNotification("Greška prilikom učitavanja vozila", "error");
      return [];
    }
  },

  // Dohvati vozilo po ID-u
  getVehicleById: async function (id) {
    try {
      return await api.getVehicleById(id);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      showNotification("Greška prilikom učitavanja vozila", "error");
      return null;
    }
  },

  // Dodaj novo vozilo
  addVehicle: async function (vehicleData) {
    try {
      const result = await api.createVehicle(vehicleData);
      showNotification("Vozilo uspješno dodano");
      return result;
    } catch (error) {
      console.error("Error adding vehicle:", error);
      showNotification(
        error.message || "Greška prilikom dodavanja vozila",
        "error"
      );
      throw error;
    }
  },

  // Ažuriraj vozilo
  updateVehicle: async function (id, vehicleData) {
    try {
      const result = await api.updateVehicle(id, vehicleData);
      showNotification("Vozilo uspješno ažurirano");
      return result;
    } catch (error) {
      console.error("Error updating vehicle:", error);
      showNotification(
        error.message || "Greška prilikom ažuriranja vozila",
        "error"
      );
      throw error;
    }
  },

  // Obriši vozilo
  deleteVehicle: async function (id) {
    try {
      await api.deleteVehicle(id);
      showNotification("Vozilo uspješno obrisano");
      return true;
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      showNotification(
        error.message || "Greška prilikom brisanja vozila",
        "error"
      );
      throw error;
    }
  },
};
