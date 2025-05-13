// Funkcija za otvaranje modala
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
  }
}

// Funkcija za zatvaranje modala
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
  }
}

// Funkcija za kreiranje i dodavanje modala na stranicu
function createModal(id, title, body, footer) {
  const modalHTML = `
  <div class="modal-backdrop" id="${id}">
      <div class="modal-container">
          <div class="modal-header">
              <h3 class="modal-title">${title}</h3>
              <button class="modal-close" data-modal-close="${id}">&times;</button>
          </div>
          <div class="modal-body">
              ${body}
          </div>
          <div class="modal-footer">
              ${footer}
          </div>
      </div>
  </div>`;

  // Dodaj modal na kraj body elementa
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Dodaj event listener za zatvaranje
  const closeBtn = document.querySelector(`[data-modal-close="${id}"]`);
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal(id));
  }

  return id;
}

// Funkcija za pokazivanje confirmation modala
function showConfirmationModal(
  title,
  message,
  confirmCallback,
  cancelCallback
) {
  const modalId = "confirmation-modal";

  // Provjeri postoji li već modal
  let modal = document.getElementById(modalId);
  if (modal) {
    document.body.removeChild(modal);
  }

  // Kreiraj sadržaj i footer
  const body = `<p>${message}</p>`;
  const footer = `
      <button class="btn btn-outline" id="cancel-btn">Odustani</button>
      <button class="btn btn-primary" id="confirm-btn">Potvrdi</button>
  `;

  // Kreiraj modal
  createModal(modalId, title, body, footer);

  // Dodaj event listenere
  document.getElementById("cancel-btn").addEventListener("click", function () {
    closeModal(modalId);
    if (cancelCallback) cancelCallback();
  });

  document.getElementById("confirm-btn").addEventListener("click", function () {
    closeModal(modalId);
    if (confirmCallback) confirmCallback();
  });

  // Prikaži modal
  openModal(modalId);
}

// Globalne funkcije za pokazivanje notifikacija
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Prikaži notifikaciju
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Sakrij i ukloni nakon 5 sekundi
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Event listeneri za zatvaranje svih modala
document.addEventListener("DOMContentLoaded", function () {
  // Zatvori modal klikom izvan modal kontejnera
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal-backdrop")) {
      closeModal(event.target.id);
    }
  });

  // Zatvori modal pritiskom na ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const openModals = document.querySelectorAll(".modal-backdrop.show");
      openModals.forEach((modal) => {
        closeModal(modal.id);
      });
    }
  });
});
