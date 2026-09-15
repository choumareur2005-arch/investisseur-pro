const toast = document.getElementById("toast");

function showMessage(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================
   BOUTONS AVEC MESSAGE
========================= */

document.querySelectorAll("[data-message]").forEach((button) => {

  button.addEventListener("click", () => {

    showMessage(button.dataset.message);

  });

});


/* =========================
   NAVIGATION
========================= */

document.querySelectorAll("[data-scroll]").forEach((button) => {

  button.addEventListener("click", () => {

    const destination = button.dataset.scroll;

    if (destination === "top") {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }

    const section = document.getElementById(destination);

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


/* =========================
   ANIMATION DES CARTES
========================= */

const cards = document.querySelectorAll(".product");

cards.forEach((card) => {

  card.addEventListener("click", () => {

    cards.forEach((item) => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");

  });

});


/* =========================
   FONCTION DISPONIBLE POUR
   LES PROCHAINES ÉTAPES
========================= */

window.showMessage = showMessage;
