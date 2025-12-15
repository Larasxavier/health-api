const express = require("express");
const crypto = require("crypto");

const { pacientes } = require("./pacientes.js");
const { recordRequest, getMetrics } = require("./metrics.js");
const { log } = require("./logger.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  recordRequest(0, false);
  res.send("Clínica Vida Clara — API Online");
});

app.get("/pacientes", (req, res) => {
  const start = Date.now();
  log("GET /pacientes");
  recordRequest(Date.now() - start, false);
  res.json(pacientes);
});

app.get("/pacientes/:id", (req, res) => {
  const start = Date.now();
  const id = Number(req.params.id);
  const paciente = pacientes.find(p => p.id === id);

  if (!paciente) {
    recordRequest(Date.now() - start, true);
    return res.status(404).json({ error: "Paciente não encontrado" });
  }

  log(`GET /pacientes/${id}`);
  recordRequest(Date.now() - start, false);
  res.json(paciente);
});

app.get("/estatisticas/resumo", (req, res) => {
  const porSetor = {};
  pacientes.forEach(p => {
    porSetor[p.setor] = (porSetor[p.setor] || 0) + 1;
  });

  res.json({
    total: pacientes.length,
    porSetor
  });
});

app.get("/metrics", (req, res) => {
  res.type("text/plain").send(getMetrics());
});

app.get("/traces", (req, res) => {
  const traceId = crypto.randomUUID();
  const base = Date.now();

  const spans = [
    { trace_id: traceId, span: "REQUEST_RECEIVED", service: "health-api", duration_ms: 3 },
    { trace_id: traceId, span: "AUTH_CHECK", service: "health-api", duration_ms: 7 },
    { trace_id: traceId, span: "DB_QUERY_PACIENTES", service: "fake-db", duration_ms: Math.floor(Math.random() * 50) },
    { trace_id: traceId, span: "BUSINESS_RULES", service: "health-api", duration_ms: 12 },
    { trace_id: traceId, span: "RESPONSE_SENT", service: "health-api", duration_ms: 2 }
  ].map((s, i) => ({
    ...s,
    timestamp: new Date(base + i * 10).toISOString(),
    status: "OK"
  }));

  log(`TRACE ${traceId} gerado (${spans.length} spans)`);
  res.json(spans);
});

app.listen(PORT, () => {
  log(`API rodando na porta ${PORT}`);
  console.log(`API rodando na porta ${PORT}`);
});
