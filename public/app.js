fetch("/pacientes")
  .then(r => r.json())
  .then(data => {
    const rows = document.getElementById("rows");
    rows.innerHTML = data.slice(0, 100).map(p => `
      <tr>
        <td>${p.id}</td>
        <td>${p.nome}</td>
        <td>${p.setor}</td>
        <td>${p.leito}</td>
        <td>${p.diasInternado}</td>
      </tr>
    `).join("");
  });
