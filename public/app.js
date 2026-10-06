const refreshButton = document.querySelector("#refresh");

async function loadDashboard() {
  try {
    const [metricsResponse, infoResponse] = await Promise.all([
      fetch("/api/metrics"),
      fetch("/api/info"),
    ]);
    if (!metricsResponse.ok || !infoResponse.ok) throw new Error("Unable to load dashboard data");
    const metrics = await metricsResponse.json();
    const info = await infoResponse.json();
    document.querySelector("#uptime").textContent = metrics.uptime;
    document.querySelector("#memory").textContent = `${metrics.memory.used} MB`;
    document.querySelector("#memory-bar").style.width = `${metrics.memory.percentage}%`;
    document.querySelector("#memory-detail").textContent = `${metrics.memory.percentage}% of ${metrics.memory.total} MB allocated`;
    document.querySelector("#region").textContent = metrics.deployment.region;
    document.querySelector("#release").textContent = metrics.deployment.release;
    document.querySelector("#node-version").textContent = info.nodeVersion;
    document.querySelector("#cpu-cores").textContent = info.cpuCores;
    document.querySelector("#hostname").textContent = info.hostname;
  } catch (error) {
    document.querySelector("#memory-detail").textContent = "Metrics temporarily unavailable";
    console.error(error);
  }
}

refreshButton.addEventListener("click", loadDashboard);
loadDashboard();
setInterval(loadDashboard, 30000);
