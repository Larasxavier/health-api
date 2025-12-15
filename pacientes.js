function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const nomes = ["Maria","João","Ana","Pedro","Carlos","Fernanda","Rafael","Beatriz","Camila","Lucas"];
const sobrenomes = ["Silva","Santos","Oliveira","Souza","Lima","Pereira","Costa","Rodrigues"];
const setores = ["UTI","Emergência","Clínica Médica","Pediatria","Cardiologia","Ortopedia","Oncologia"];
const cidades = ["Aracaju","Recife","Salvador","Maceió","João Pessoa"];

const pacientes = Array.from({ length: 1000 }, (_, i) => {
  const setor = pick(setores);
  return {
    id: i + 1,
    nome: `${pick(nomes)} ${pick(sobrenomes)}`,
    idade: rand(1, 95),
    sexo: Math.random() > 0.5 ? "F" : "M",
    cidade: pick(cidades),
    uf: "BR",
    setor,
    ala: setor.substring(0, 2).toUpperCase(),
    leito: `${setor.substring(0, 2).toUpperCase()}-${rand(1, 40)}`,
    diasInternado: rand(0, 30),
    comorbidades: ["Hipertensão","Diabetes","Asma"].filter(() => Math.random() > 0.6)
  };
});

module.exports = { pacientes };
