const colors = [
  '#4f46e5','#7c3aed','#db2777','#ea580c',
  '#16a34a','#0284c7','#b45309','#dc2626'
];

function getColor(nome) {
  let hash = 0;
  for (let i = 0; i < nome.length; i++) hash += nome.charCodeAt(i);
  return colors[hash % colors.length];
}

let indiceModifica = null;

const form = document.getElementById("form");
const lista = document.getElementById("lista");
const cerca = document.getElementById("cerca");

let contatti = JSON.parse(localStorage.getItem("contatti")) || [];

mostra();

form.addEventListener("submit", e => {
  e.preventDefault();

  if (indiceModifica === null) {
    contatti.push({
      nome: nome.value,
      cognome: cognome.value,
      telefono: telefono.value
    });
  } else {
    contatti[indiceModifica].nome = nome.value;
    contatti[indiceModifica].cognome = cognome.value;
    contatti[indiceModifica].telefono = telefono.value;
    indiceModifica = null;
  }

  localStorage.setItem("contatti", JSON.stringify(contatti));
  form.reset();
  mostra();
});

function mostra() {
  lista.innerHTML = "";
  contatti.forEach((c, i) => {
    const colore = getColor(c.nome + c.cognome);
    const iniziale = c.nome ? c.nome[0].toUpperCase() : "?";
    lista.innerHTML += `
      <li>
        <div class="avatar" style="background:${colore}">${iniziale}</div>
        <div class="info">
          <a href="pagina-dettagli.html?id=${i}">${c.nome} ${c.cognome}</a>
          <span>${c.telefono}</span>
        </div>
        <div class="azioni">
          <button onclick="modifica(${i})">✏️</button>
          <button onclick="duplica(${i})">📄</button>
          <button onclick="cancella(${i})">❌</button>
        </div>
      </li>
    `;
  });
}

cerca.addEventListener("input", () => {
  const testo = cerca.value.toLowerCase();
  lista.innerHTML = "";

  contatti.forEach((c, i) => {
    const completo = `${c.nome} ${c.cognome} ${c.telefono}`.toLowerCase();
    if (completo.includes(testo)) {
      const colore = getColor(c.nome + c.cognome);
      const iniziale = c.nome ? c.nome[0].toUpperCase() : "?";
      lista.innerHTML += `
        <li>
          <div class="avatar" style="background:${colore}">${iniziale}</div>
          <div class="info">
            <a href="pagina-dettagli.html?id=${i}">${c.nome} ${c.cognome}</a>
            <span>${c.telefono}</span>
          </div>
          <div class="azioni">
            <button onclick="modifica(${i})">✏️</button>
            <button onclick="duplica(${i})">📄</button>
            <button onclick="cancella(${i})">❌</button>
          </div>
        </li>
      `;
    }
  });
});

function modifica(i) {
  indiceModifica = i;
  nome.value = contatti[i].nome;
  cognome.value = contatti[i].cognome;
  telefono.value = contatti[i].telefono;
}

function cancella(i) {
  contatti.splice(i, 1);
  localStorage.setItem("contatti", JSON.stringify(contatti));
  mostra();
}

function duplica(i) {
  contatti.push({
    nome: contatti[i].nome,
    cognome: contatti[i].cognome,
    telefono: contatti[i].telefono
  });
  localStorage.setItem("contatti", JSON.stringify(contatti));
  mostra();
}