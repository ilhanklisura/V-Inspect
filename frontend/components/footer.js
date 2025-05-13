// Funkcija za generiranje footera
function createFooter() {
  const currentYear = new Date().getFullYear();

  return `
  <footer class="main-footer">
      <div class="container">
          <div class="footer-content">
              <div class="footer-bottom">
                  <p>&copy; ${currentYear} VInspect. Sva prava pridržana.</p>
              </div>
          </div>
      </div>
  </footer>`;
}

// Učitaj footer na stranici
document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = createFooter();
  }
});
