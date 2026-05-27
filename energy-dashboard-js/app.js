const loadDataButton = document.getElementById("load-data-button");
const totalUsageElement = document.getElementById("total-usage");
const deviceCountElement = document.getElementById("device-count");
const alertCountElement = document.getElementById("alert-count");
const deviceListElement = document.getElementById("device-list");

function formatUsage(usageKwh) {
  return `${usageKwh} kWh`;
}

function calculateTotalUsage(devices) {
  return devices.reduce(function(total, device) {
    return total + device.usageKwh;
  }, 0);
}

function countAlerts(devices) {
  return devices.filter(function(device) {
    return device.status === "High Usage";
  }).length;
}

function createDeviceCard(device) {
  const isAlert = device.status === "High Usage";

  return `
    <article class="device-card ${isAlert ? "alert" : ""}">
      <h3>${device.device}</h3>
      <p><strong>Building:</strong> ${device.building}</p>
      <p><strong>Usage:</strong> ${formatUsage(device.usageKwh)}</p>
      <p><strong>Status:</strong> ${device.status}</p>
    </article>
  `;
}

function renderDashboard(devices) {
  const totalUsage = calculateTotalUsage(devices);
  const alertCount = countAlerts(devices);

  totalUsageElement.textContent = formatUsage(totalUsage);
  deviceCountElement.textContent = devices.length;
  alertCountElement.textContent = alertCount;

  const deviceCards = devices.map(function(device) {
    return createDeviceCard(device);
  });

  deviceListElement.innerHTML = deviceCards.join("");
}

async function loadEnergyData() {
  try {
    const response = await fetch("energy-data.json");

    if (!response.ok) {
      throw new Error("Failed to load energy data");
    }

    const devices = await response.json();

    renderDashboard(devices);
  } catch (error) {
    console.error(error);
    deviceListElement.innerHTML = "<p>Unable to load energy data.</p>";
  }
}

loadDataButton.addEventListener("click", loadEnergyData);

async function loadEnergyData() {
  try {
    deviceListElement.innerHTML = "<p>Loading energy data...</p>";

    const response = await fetch("energy-data.json");

    if (!response.ok) {
      throw new Error("Failed to load energy data");
    }

    const devices = await response.json();

    renderDashboard(devices);
  } catch (error) {
    console.error(error);
    deviceListElement.innerHTML = "<p>Unable to load energy data.</p>";
  }
}

loadDataButton.addEventListener("click", loadEnergyData);
loadEnergyData();

console.log(devices);
console.log(totalUsage);