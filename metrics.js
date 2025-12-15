let requests = 0;
let errors = 0;
let latencySum = 0;
let samples = 0;
const startedAt = Date.now();

function recordRequest(latency, isError) {
  requests++;
  samples++;
  latencySum += latency || 0;
  if (isError) errors++;
}

function getMetrics() {
  const avgLatency = samples ? latencySum / samples : 0;
  const uptime = Date.now() - startedAt;

  return `
api_requests_total ${requests}
api_errors_total ${errors}
api_latency_ms ${avgLatency.toFixed(2)}
api_uptime_ms ${uptime}
`.trim();
}

module.exports = { recordRequest, getMetrics };
