import { BASE_URL } from "./apiurl.js";

const loginform = document.querySelector("#loginform");

loginform.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({ email, password })
      }); 
    if (response.ok) { 
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      window.location.href = "index.html";
    }else { 
      alert("Erreur d'identifiants"); 
  } 
});
