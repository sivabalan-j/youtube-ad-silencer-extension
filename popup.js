const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

// Load saved state
chrome.storage.local.get("enabled", data => {
  const enabled = data.enabled !== false;
  toggle.checked = enabled;
  status.textContent = enabled ? "Ad blocking ON" : "Ad blocking OFF";
});

// Toggle ON / OFF
toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled });
  status.textContent = enabled ? "Ad blocking ON" : "Ad blocking OFF";
});
