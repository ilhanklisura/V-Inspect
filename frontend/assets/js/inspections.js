// Globalni objekt za upravljanje tehničkim pregledima
const InspectionManager = {
  // Dohvati sve preglede (admin, osoblje)
  getAllInspections: async function () {
    try {
      return await api.getInspections();
    } catch (error) {
      console.error("Error fetching inspections:", error);
      showNotification("Greška prilikom učitavanja pregleda", "error");
      return [];
    }
  },

  // Dohvati preglede trenutnog korisnika (vlasnik vozila)
  getMyInspections: async function () {
    try {
      return await api.getMyInspections();
    } catch (error) {
      console.error("Error fetching inspections:", error);
      showNotification("Greška prilikom učitavanja pregleda", "error");
      return [];
    }
  },

  // Dohvati pregled po ID-u
  getInspectionById: async function (id) {
    try {
      return await api.getInspectionById(id);
    } catch (error) {
      console.error("Error fetching inspection:", error);
      showNotification("Greška prilikom učitavanja pregleda", "error");
      return null;
    }
  },

  // Zakaži novi pregled (vlasnik vozila)
  scheduleInspection: async function (inspectionData) {
    try {
      const result = await api.scheduleInspection(inspectionData);
      showNotification("Pregled uspješno zakazan");
      return result;
    } catch (error) {
      console.error("Error scheduling inspection:", error);
      showNotification(
        error.message || "Greška prilikom zakazivanja pregleda",
        "error"
      );
      throw error;
    }
  },

  // Ažuriraj pregled (osoblje, admin)
  updateInspection: async function (id, inspectionData) {
    try {
      const result = await api.updateInspection(id, inspectionData);
      showNotification("Pregled uspješno ažuriran");
      return result;
    } catch (error) {
      console.error("Error updating inspection:", error);
      showNotification(
        error.message || "Greška prilikom ažuriranja pregleda",
        "error"
      );
      throw error;
    }
  },

  // Obriši pregled (admin)
  deleteInspection: async function (id) {
    try {
      await api.deleteInspection(id);
      showNotification("Pregled uspješno obrisan");
      return true;
    } catch (error) {
      console.error("Error deleting inspection:", error);
      showNotification(
        error.message || "Greška prilikom brisanja pregleda",
        "error"
      );
      throw error;
    }
  },

  // Formatiraj datum i vrijeme pregleda
  formatInspectionDate: function (dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("bs-BA");
  },

  // Dohvati statusnu klasu za prikaz
  getStatusClass: function (status) {
    return status === "scheduled"
      ? "status-scheduled"
      : status === "completed"
      ? "status-completed"
      : "status-failed";
  },

  // Dohvati tekstualni prikaz statusa
  getStatusText: function (status) {
    return status === "scheduled"
      ? "Zakazan"
      : status === "completed"
      ? "Završen"
      : "Nije prošao";
  },
};
