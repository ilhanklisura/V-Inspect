function createHeader(activePage, userRole) {
  let username = "";
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      username = payload.email || "Korisnik";
    }
  } catch (e) {
    console.error("Error parsing token:", e);
  }

  return `
  <div class="main-header">
      <div class="container">
          <div class="header-content">
              <div class="logo">VInspect</div>
              <div class="user-info">
                  <span class="user-name" id="userNameDisplay">${username}</span>
                  <button id="logout-btn" class="logout-btn">
                      <i class="fas fa-sign-out-alt mr-1"></i> Odjava
                  </button>
              </div>
          </div>
      </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    const activePage = headerContainer.dataset.activePage || "";
    const userRole = headerContainer.dataset.userRole || "";

    headerContainer.innerHTML = createHeader(activePage, userRole);

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "/auth/login.html";
      });
    }
  }
});
