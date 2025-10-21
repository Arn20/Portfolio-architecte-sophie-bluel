import { getCategories, ajouterTravail } from "./api.js";
import { afficherGallery } from "./gallery.js";
import { supprimerTravail } from "./api.js";

export async function initForm(travaux) {
  const inputphoto = document.getElementById("photo");
  const inputtitle = document.getElementById("title");
  const inputcategory = document.getElementById("category");
  const choosepicture = document.getElementById("choosepicture");
  const prevuphoto = document.querySelector(".prevuphoto");
  const validpicture = document.getElementById("validpicture");
  const formAddPhoto = document.getElementById("formAddPhoto");

  // boutons modale
  const backBtn = document.querySelector("#iconmodale .backModal");
  const closeBtn2 = document.querySelector("#modaladdpicture .closeModal2");

  // remplir select avec catégories
  const categories = await getCategories();
  for (const c of categories) {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    inputcategory.appendChild(option);
  }

  // fonction de vérification des champs
  function checkForm() {
    if (inputphoto.files[0] && inputtitle.value !== "" && inputcategory.value !== "") {
      validpicture.disabled = false;
      validpicture.style.backgroundColor = "#1D6154";
    } else {
      validpicture.disabled = true;
      validpicture.style.backgroundColor = "#ccc";
    }
  }

  // fonction pour réinitialiser la prévisualisation et le formulaire
  function resetPreview() {
    prevuphoto.innerHTML = "";
    prevuphoto.style.display = "none";
    choosepicture.style.display = "flex";
    inputphoto.value = "";
    inputtitle.value = "";
    inputcategory.value = "";
    checkForm();
  }

  // fonction pour afficher les images dans la modale principale
  function afficherModaleImages() {
    const modalImg = document.querySelector("#modal-img");
    modalImg.innerHTML = "";

    for (const t of travaux) {
      const imgcontent = document.createElement("div");
      const supbtn = document.createElement("button");
      const img = document.createElement("img");

      supbtn.innerHTML = '<i class="fa-regular fa-trash-can trashicon"></i>';
      supbtn.style.cssText = `
        width: 17px; height: 17px; background: black;
        left: 55px; top: 5px; border: none; outline: none; position: absolute;
      `;
      imgcontent.style.cssText = `
        width: 76px; height: 102px; position: relative;
      `;
      img.style.width = "100%";
      img.style.height = "100%";
      img.src = t.imageUrl;
      img.alt = t.title;

      imgcontent.appendChild(supbtn);
      imgcontent.appendChild(img);
      modalImg.appendChild(imgcontent);

      // Supprimer et rafraîchir la modale
      supbtn.addEventListener("click", async () => {
        await supprimerTravail(t.id, travaux, afficherGallery);
        afficherModaleImages();
      });
    }

    modalImg.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
      gap: 10px; row-gap: 30px; justify-content: center;
      padding: 40px 80px;
    `;
  }

  // écouteurs sur les champs
  inputtitle.addEventListener("input", checkForm);
  inputcategory.addEventListener("change", checkForm);
  inputphoto.addEventListener("change", () => {
    checkForm();
    prevuphoto.innerHTML = "";
    if (inputphoto.files[0]) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(inputphoto.files[0]);
      img.style.width = "129px";
      img.style.height = "193px";
      img.style.objectFit = "cover";
      prevuphoto.style.display = "flex";
      choosepicture.style.display = "none";
      prevuphoto.appendChild(img);
    }
  });

  // soumission du formulaire
  formAddPhoto.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formAddPhoto);
    const result = await ajouterTravail(formData);
    travaux.push(result);

    afficherGallery(travaux);       // mettre à jour la galerie principale
    afficherModaleImages();          // mettre à jour la modale principale
    resetPreview();                  // vider le formulaire et la prévisualisation
  });

  // reset et mise à jour quand on ferme la modale ou clique sur retour
  backBtn.addEventListener("click", () => {
    document.getElementById("modaladdpicture").style.display = "none";
    document.getElementById("modal").style.display = "flex";
    afficherModaleImages();
    resetPreview();
  });
  closeBtn2.addEventListener("click", () => {
    document.getElementById("modaladdpicture").style.display = "none";
    resetPreview();
  });
}