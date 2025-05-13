// Globalni objekt za upravljanje stanicama za tehnički pregled
const StationManager = {
  // Dohvati sve stanice
  getAllStations: async function () {
    try {
      return await api.getStations();
    } catch (error) {
      console.error("Error fetching stations:", error);
      showNotification("Greška prilikom učitavanja stanica", "error");
      return [];
    }
  },

  // Dohvati stanicu po ID-u
  getStationById: async function (id) {
    try {
      return await api.getStationById(id);
    } catch (error) {
      console.error("Error fetching station:", error);
      showNotification("Greška prilikom učitavanja stanice", "error");
      return null;
    }
  },

  // Dodaj novu stanicu (admin)
  addStation: async function (stationData) {
    try {
      const result = await api.createStation(stationData);
      showNotification("Stanica uspješno dodana");
      return result;
    } catch (error) {
      console.error("Error adding station:", error);
      showNotification(
        error.message || "Greška prilikom dodavanja stanice",
        "error"
      );
      throw error;
    }
  },

  // Ažuriraj stanicu (admin)
  updateStation: async function (id, stationData) {
    try {
      const result = await api.updateStation(id, stationData);
      showNotification("Stanica uspješno ažurirana");
      return result;
    } catch (error) {
      console.error("Error updating station:", error);
      showNotification(
        error.message || "Greška prilikom ažuriranja stanice",
        "error"
      );
      throw error;
    }
  },

  // Obriši stanicu (admin)
  deleteStation: async function (id) {
    try {
      await api.deleteStation(id);
      showNotification("Stanica uspješno obrisana");
      return true;
    } catch (error) {
      console.error("Error deleting station:", error);
      showNotification(
        error.message || "Greška prilikom brisanja stanice",
        "error"
      );
      throw error;
    }
  },
};
