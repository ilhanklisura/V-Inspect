// Globalni objekt za upravljanje korisnicima
const UserManager = {
  // Dohvati sve korisnike (admin)
  getAllUsers: async function () {
    try {
      return await api.getUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification("Greška prilikom učitavanja korisnika", "error");
      return [];
    }
  },

  // Dohvati korisnika po ID-u
  getUserById: async function (id) {
    try {
      return await api.getUserById(id);
    } catch (error) {
      console.error("Error fetching user:", error);
      showNotification("Greška prilikom učitavanja korisnika", "error");
      return null;
    }
  },

  // Dodaj novog korisnika (admin)
  addUser: async function (userData) {
    try {
      const result = await api.createUser(userData);
      showNotification("Korisnik uspješno dodan");
      return result;
    } catch (error) {
      console.error("Error adding user:", error);
      showNotification(
        error.message || "Greška prilikom dodavanja korisnika",
        "error"
      );
      throw error;
    }
  },

  // Ažuriraj korisnika (admin)
  updateUser: async function (id, userData) {
    try {
      const result = await api.updateUser(id, userData);
      showNotification("Korisnik uspješno ažuriran");
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      showNotification(
        error.message || "Greška prilikom ažuriranja korisnika",
        "error"
      );
      throw error;
    }
  },

  // Obriši korisnika (admin)
  deleteUser: async function (id) {
    try {
      await api.deleteUser(id);
      showNotification("Korisnik uspješno obrisan");
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      showNotification(
        error.message || "Greška prilikom brisanja korisnika",
        "error"
      );
      throw error;
    }
  },

  // Dohvati naziv uloge za prikaz
  getRoleName: function (role) {
    return role === "admin"
      ? "Administrator"
      : role === "vehicle_owner"
      ? "Vlasnik vozila"
      : "Osoblje za pregled";
  },
};
