const add = document.getElementById("add");
const extraForm = document.getElementById("extraForm");
const salva = document.getElementById("salva");
const dettagliDiv = document.getElementById("dettagli");
const home = document.getElementById("home")

// LEGGI CONTATTI
const contatti = JSON.parse(localStorage.getItem("contatti")) || [];

// PRENDI ID DALL'URL
const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get("id"));

// MOSTRA DETTAGLI CONTATTO
if (!isNaN(id) && contatti[id]) {
  const c = contatti[id];

  dettagliDiv.innerHTML = `
    <p><strong>Nome:</strong> ${c.nome}</p>
    <p><strong>Cognome:</strong> ${c.cognome}</p>
    <p><strong>Telefono:</strong> ${c.telefono}</p>
    <p><strong>Indirizzo:</strong> ${c.indirizzo || "-"}</p>
    <p><strong>Email:</strong> ${c.email || "-"}</p>
    <p><strong>Tag:</strong> ${c.tag || "-"}</p>
  `;
} else {
  dettagliDiv.innerHTML = "<p>Contatto non trovato</p>";
}

// CLICK → MOSTRA FORM
add.addEventListener("click", () => {
  extraForm.style.display = "block";
});

// SALVA INFO EXTRA
salva.addEventListener("click", () => {
  contatti[id].indirizzo = document.getElementById("indirizzo").value;
  contatti[id].email = document.getElementById("email").value;
  contatti[id].tag = document.getElementById("tag").value;

  localStorage.setItem("contatti", JSON.stringify(contatti));

  alert("Informazioni salvate!");
  location.reload();
});



