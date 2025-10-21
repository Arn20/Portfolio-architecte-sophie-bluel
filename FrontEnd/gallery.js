//récupérer donné avec fetch
const reponse = await fetch("http://localhost:5678/api/works");
const travaux = await reponse.json();

const traveauxTrier = [];

let BoutonObjets = document.querySelector(".categorie.Objets");
let BoutonTous = document.querySelector(".categorie.Tous");
let BoutonAppartements = document.querySelector(".categorie.Appartements");
let Boutonhr = document.querySelector(".categorie.hr");



function afficherGallery(tableau){
   const gallery = document.querySelector(".gallery");
   gallery.innerHTML =" ";
   for (const objet of tableau){
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = objet.imageUrl;
      img.alt = objet.title;
      figcaption.textContent = objet.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
  }
}

afficherGallery(travaux);

async function supprimerTravail(id) {
  const response = await fetch(`http://localhost:5678/api/works/${id}`, { 
    method: "DELETE", 
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")} `} 
  });
  const index = travaux.findIndex(objet => objet.id === id);
  if (index !== -1) {
    travaux.splice(index, 1); 
  afficherGallery(travaux);
}};

BoutonObjets.addEventListener("click", function () {
  traveauxTrier.length = 0;
  for (const travau of travaux){
   if (travau.category.name === "Objets"){
      traveauxTrier.push(travau);
  }
  afficherGallery(traveauxTrier);
}});

BoutonAppartements.addEventListener("click", function () {
  traveauxTrier.length = 0;
  for (const travau of travaux){
   if (travau.category.name === "Appartements"){
      traveauxTrier.push(travau);
  }
  afficherGallery(traveauxTrier);
}});

Boutonhr.addEventListener("click", function () {
  traveauxTrier.length = 0;
  for (const travau of travaux){
   if (travau.category.name === "Hotels & restaurants"){
      traveauxTrier.push(travau);
  }
  afficherGallery(traveauxTrier);
}});

BoutonTous.addEventListener("click", function () {
  traveauxTrier.length = 0;
  afficherGallery(travaux);
});

const loginLi = document.getElementById("linklogin");
const loginLink = loginLi.querySelector("a");
const token = localStorage.getItem("token");

if (token) {
  loginLink.textContent = "logout";
  loginLink.href = "#";

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();

   });

  //const body = document.querySelector("body");
  const addpicturebtn = document.getElementById("addpicture");
  const modaladdpicture = document.getElementById("modaladdpicture");
  const closeBtn1 = document.querySelector("#modal .closeModal");
  const closeBtn2 = document.querySelector("#modaladdpicture .closeModal");
  const categoris = document.querySelector(".categories");
  const portfolio = document.getElementById("portfolio");
  const modifier = document.createElement("p");
  const modifierlink = document.createElement("a");

  modifierlink.href = "#";
  modifierlink.textContent = "modifier";
  portfolio.insertBefore(modifier, categoris);
  modifier.appendChild(modifierlink);

  categoris.remove();

  modifierlink.addEventListener("click", function(e) {
  e.preventDefault();
  let modaleDiv = document.getElementById("modal");
  modaleDiv.style.display = "flex";
  const modalImg = document.querySelector("#modal-img");
  modalImg.innerHTML =" ";
  for (const travau of travaux){
      const imgcontent = document.createElement("div");
      const supbtn = document.createElement("button");
      supbtn.innerHTML ='<i class="fa-regular fa-trash-can trashicon"></i>';
      supbtn.style.width="17px";
      supbtn.style.height="17px";
      supbtn.style.background="black";
      supbtn.style.left="59px";
      supbtn.style.border="none";
      supbtn.style.outline="none";
      supbtn.style.position="absolute";
      imgcontent.style.width = "76px";
      imgcontent.style.height = "102px";
      imgcontent.style.position = "relative";

      const img = document.createElement("img");
      img.style.width = "100%";
      img.style.height = "100%";
  
      img.src = travau.imageUrl;
      img.alt = travau.title;

      imgcontent.appendChild(supbtn);
      imgcontent.appendChild(img);
      modalImg.appendChild(imgcontent);

      modalImg.style.display = "flex";
      modalImg.style.flexWrap = "wrap";
      modalImg.style.gap ="10px";
      modalImg.style.padding ="30px";

      supbtn.addEventListener("click", () => {
        supprimerTravail(travau.id);
      });
  }
addpicturebtn.addEventListener("click", () =>{
  modaleDiv.style.display = "none";
  modaladdpicture.style.display ="flex";

})

closeBtn1.addEventListener("click", () => {
 modaleDiv.style.display = "none";

});
closeBtn2.addEventListener("click", () => {
 modaladdpicture.style.display ="none";
});


});

const categoriesReponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesReponse.json();
const categorySelect = document.getElementById("category");
for (const categorie of categories){
  const option = document.createElement("option");
  option.value = categorie.id;
  option.textContent = categorie.name;
  categorySelect.appendChild(option);
};

const formAddPhoto = document.getElementById("formAddPhoto");
formAddPhoto.addEventListener("submit", async (e) => {  
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}` },
    body: formData });

    if (!response.ok) {
    const text = await response.text();
    console.error("Erreur serveur :", text);
    return; 
  }
    const result = await response.json();
    travaux.push(result);
    afficherGallery(travaux);
    formAddPhoto.reset();
    modaladdpicture.style.display = "none";
});

} else {
  loginLink.textContent = "login";
  loginLink.href = "login.html";
};