import { BASE_URL } from "./apiurl.js";

// Récupération des travaux
export async function getTravaux() {
  const response = await fetch(`${BASE_URL}works`);
  return response.json();
}

// Récupération des catégories
export async function getCategories() {
  const response = await fetch(`${BASE_URL}categories`);
  return response.json();
}

// Suppression d'un travail
export async function supprimerTravail(id, travaux, afficherGallery) {
    await fetch(`${BASE_URL}works/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  });
  const index = travaux.findIndex(objet => objet.id === id);
  if (index !== -1) {
    travaux.splice(index, 1);
    afficherGallery(travaux);
  }
}

// Ajout d'un travail
export async function ajouterTravail(formData) {
  const response = await fetch(`${BASE_URL}works`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    body: formData
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}