const express = require("express");
const os = require("os");
const process = require("process");

const app = express();
const startedAt = Date.now();
const port = Number(process.env.PORT) || 3000;
const release = process.env.RELEASE || "2026.10";

app.disable("x-powered-by");
app.use(express.static("public", { extensions: ["html"] }));

function getUptime() {
  const seconds = Math.floor((Date.now() - startedAt) / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

function getMemoryUsage() {
  const { heapUsed, heapTotal } = process.memoryUsage();
  return {
    used: Math.round(heapUsed / 1024 / 1024),
    total: Math.round(heapTotal / 1024 / 1024),
    percentage: Math.round((heapUsed / heapTotal) * 100),
  };
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "cloudpulse",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

app.get("/api/metrics", (req, res) => {
  const memory = getMemoryUsage();
  res.json({
    uptime: getUptime(),
    memory,
    requests: {
      status: "operational",
      latency: "24ms",
      availability: "99.98%",
    },
    deployment: {
      release,
      environment: process.env.NODE_ENV || "development",
      region: process.env.REGION || "local-docker",
    },
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: process.platform,
    nodeVersion: process.version,
    cpuCores: os.cpus().length,
    startedAt: new Date(startedAt).toISOString(),
  });
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  return res.sendFile("index.html", { root: "public" }, next);
});

if (require.main === module) {
  const server = app.listen(port, "0.0.0.0", () => {
    console.log(`CloudPulse listening on port ${port}`);
  });

  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down gracefully`);
    server.close(() => process.exit(0));
  };

  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
}

module.exports = app;