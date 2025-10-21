import { getTravaux } from "./api.js";
import { afficherGallery, initFiltres, initModal } from "./gallery.js";
import { initForm } from "./form.js";

async function main() {
  const travaux = await getTravaux();
  afficherGallery(travaux);
  initFiltres(travaux, afficherGallery);

  const token = localStorage.getItem("token");
  const loginLink = document.querySelector("#linklogin a");
  
  if (token) {
    loginLink.textContent = "logout";
    loginLink.href = "#";
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.reload();
    });

    initModal(travaux, afficherGallery);
    initForm(travaux);
  } else {
    loginLink.textContent = "login";
    loginLink.href = "login.html";
  }
}

main();