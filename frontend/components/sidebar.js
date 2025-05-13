// Funkcija za generiranje sidebara ovisno o ulozi korisnika
function createSidebar(activePage, userRole) {
  let sidebarItems = "";

  // Ovisno o ulozi korisnika, dodaj odgovarajuće linkove
  if (userRole === "admin") {
    sidebarItems = `
          <li class="sidebar-item">
              <a href="/pages/admin/dashboard.html" class="sidebar-link ${
                activePage === "dashboard" ? "active" : ""
              }">
                  <i class="fas fa-tachometer-alt sidebar-icon"></i> Dashboard
              </a>
          </li>
          <li class="sidebar-item">
              <a href="/pages/admin/users.html" class="sidebar-link ${
                activePage === "users" ? "active" : ""
              }">
                  <i class="fas fa-users sidebar-icon"></i> Korisnici
              </a>
          </li>
          <li class="sidebar-item">
              <a href="/pages/admin/vehicles.html" class="sidebar-link ${
                activePage === "vehicles" ? "active" : ""
              }">
                  <i class="fas fa-car sidebar-icon"></i> Vozila
              </a>
          </li>
          <li class="sidebar-item">
              <a href="/pages/admin/stations.html" class="sidebar-link ${
                activePage === "stations" ? "active" : ""
              }">
                  <i class="fas fa-building sidebar-icon"></i> Stanice
              </a>
          </li>
          <li class="sidebar-item">
              <a href="/pages/admin/inspections.html" class="sidebar-link ${
                activePage === "inspections" ? "active" : ""
              }">
                  <i class="fas fa-clipboard-check sidebar-icon"></i> Pregledi
              </a>
          </li>`;
  } else if (userRole === "vehicle_owner") {
    sidebarItems = `
          <li class="sidebar-item">
              <a href="/pages/vehicle-owner/dashboard.html" class="sidebar-link ${
                activePage === "dashboard" ? "active" : ""
              }">
                  <i class="fas fa-tachometer-alt sidebar-icon"></i> Dashboard
              </a>
          </li>
          <li class="sidebar-item">
              <a href="/pages/vehicle-owner/vehicles.html" class="sidebar-link ${
                activePage === "vehicles" ? "active" : ""
              }">
                  <i class="fas fa-car sidebar-icon"></i> Moja vozila
              </a>
          </li>
          <li class="sidebar-item">
              <a href="/pages/vehicle-owner/inspections.html" class="sidebar-link ${
                activePage === "inspections" ? "active" : ""
              }">
                  <i class="fas fa-clipboard-check sidebar-icon"></i> Tehnički pregledi
              </a>
          </li>`;
  } else if (userRole === "inspection_staff") {
    sidebarItems = `
          <li class="sidebar-item">
              <a href="/pages/inspection-staff/dashboard.html" class="sidebar-link ${
                activePage === "dashboard" ? "active" : ""
              }">
                  <i class="fas fa-tachometer-alt sidebar-icon"></i> Dashboard
              </a>
          </li>
          <li class="sidebar-item">
              <a href="/pages/inspection-staff/inspections.html" class="sidebar-link ${
                activePage === "inspections" ? "active" : ""
              }">
                  <i class="fas fa-clipboard-check sidebar-icon"></i> Pregledi
              </a>
          </li>`;
  }

  return `
  <div class="sidebar">
      <ul class="sidebar-menu">
          ${sidebarItems}
      </ul>
  </div>`;
}

// Učitaj sidebar na stranici
document.addEventListener("DOMContentLoaded", function () {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (sidebarContainer) {
    // Dohvati aktivnu stranicu i ulogu iz podataka elementa
    const activePage = sidebarContainer.dataset.activePage || "";
    const userRole = sidebarContainer.dataset.userRole || "";

    sidebarContainer.innerHTML = createSidebar(activePage, userRole);
  }
});
