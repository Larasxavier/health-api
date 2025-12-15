const fs = require("fs");

function log(message) {
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    message
  }) + "\n";

  fs.appendFileSync("logs.txt", line);
}

module.exports = { log };
