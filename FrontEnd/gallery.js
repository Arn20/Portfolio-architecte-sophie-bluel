import { getCategories, supprimerTravail } from "./api.js";

//afficher tout les éléments de la galerie 
export function afficherGallery(travaux) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (const t of travaux) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = t.imageUrl;
    img.alt = t.title;
    figcaption.textContent = t.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}
//création et gestion des filtres
export async function initFiltres(travaux, afficherGallery) {
  const traveauxTrier = [];
  const categoriesContainer = document.querySelector(".categories");
  const categories = await getCategories();

  const BoutonTous = document.createElement("button");
  BoutonTous.textContent = "Tous";
  BoutonTous.classList.add("categorie");
  categoriesContainer.appendChild(BoutonTous);
  BoutonTous.addEventListener("click", () => {
  afficherGallery(travaux); // Affiche tous les travaux
})

  categories.forEach((categorie) => {
    const bouton = document.createElement("button");
    bouton.textContent = categorie.name;
    bouton.classList.add("categorie");
    categoriesContainer.appendChild(bouton);

    // Gestion du clic sur chaque bouton
    bouton.addEventListener("click", () => {
      traveauxTrier.length = 0;
      travaux.forEach((t) => {
        if (t.category && t.category.name === categorie.name) {
          traveauxTrier.push(t);
        }
      });
      afficherGallery(traveauxTrier);
    });
  });
   
}
//création et gestion de la modale
export function initModal(travaux, afficherGallery) {
  const addpicturebtn = document.getElementById("addpicture");
  const modaladdpicture = document.getElementById("modaladdpicture");
  const backBtn = document.querySelector("#iconmodale .backModal");
  const closeBtn1 = document.querySelector("#modal .closeModal");
  const closeBtn2 = document.querySelector("#modaladdpicture .closeModal2");
  const editionmodifier = document.querySelector(".editionmodifier");
  
  const modiferincon = document.createElement("object");
  modiferincon.data = "./assets/icons/Group.svg";
  modiferincon.type = "image/svg+xml";
  const modifier = document.createElement("p");
  const modifierlink = document.createElement("a");
  modifierlink.href = "#";
  modifierlink.textContent = "modifier";
  editionmodifier.appendChild(modiferincon);
  editionmodifier.appendChild(modifier);
  editionmodifier.style.cssText = `display : flex;`;
  modifier.appendChild(modifierlink);
  document.querySelector(".editionmode").style.display ="flex";
  document.querySelector("header").style.margin="100px 0px";
  document.querySelector(".categories").remove();

  // Fonction pour afficher les images dans la modale
  function afficherModaleImages() {
    const modalImg = document.querySelector("#modal-img");
    modalImg.innerHTML = "";
    
    //afficher les images dans la modale
    for (const t of travaux) {
      const imgcontent = document.createElement("div");
      const trashiconimg = document.createElement("img");
      const img = document.createElement("img");

      trashiconimg.src ="./assets/icons/Group9.svg";
      trashiconimg.alt ="Supprimer";
      trashiconimg.style.cssText = `
        width: 17px; height: 17px; 
        left: 55px; top: 5px; outline: none; position: absolute;
      `;
      imgcontent.style.cssText = `
        width: 76px; height: 102px; position: relative;
      `;
      img.style.width = "100%";
      img.style.height = "100%";
      img.src = t.imageUrl;
      img.alt = t.title;

      imgcontent.appendChild(trashiconimg);
      imgcontent.appendChild(img);
      modalImg.appendChild(imgcontent);

      // Supprimer et rafraîchir la modale automatiquement
      trashiconimg.addEventListener("click", async () => {
        await supprimerTravail(t.id, travaux, afficherGallery);
        afficherModaleImages(); // mise à jour automatique
      });
    }

    // Style de la grille
    const modalImgContainer = document.querySelector("#modal-img");
    modalImgContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
      gap: 10px; row-gap: 30px; justify-content: center;
      padding: 40px 80px;
    `;
  }

  // Ouverture modale
  modifierlink.addEventListener("click", (e) => {
    e.preventDefault();
    const modaleDiv = document.getElementById("modal");
    modaleDiv.style.display = "flex";
    afficherModaleImages();
  });

  addpicturebtn.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
    modaladdpicture.style.display = "flex";
  });

  backBtn.addEventListener("click", () => {
    modaladdpicture.style.display = "none";
    document.getElementById("modal").style.display = "flex";
  });

  closeBtn1.addEventListener("click", () => document.getElementById("modal").style.display = "none");
  document.getElementById("modal").addEventListener("click", (e) => {
    // si on clique directement sur l'arrière-plan (pas dans le contenu)
    if (e.target === modal) {
      modal.style.display = "none";
    }});
  closeBtn2.addEventListener("click", () => modaladdpicture.style.display = "none");
  modaladdpicture.addEventListener("click", (e) => {
    // si on clique directement sur l'arrière-plan (pas dans le contenu)
    if (e.target === modaladdpicture) {
    modaladdpicture.style.display = "none";
  }});
}