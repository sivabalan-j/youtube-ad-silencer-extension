let enabled = true;
let intervalId = null;

// Load state
chrome.storage.local.get("enabled", data => {
  enabled = data.enabled !== false;
  enabled ? startBlocking() : stopBlocking();
});

// Listen for toggle changes
chrome.storage.onChanged.addListener(changes => {
  if (changes.enabled) {
    enabled = changes.enabled.newValue;
    enabled ? startBlocking() : stopBlocking();
  }
});

function startBlocking() {
  if (intervalId) return;

  intervalId = setInterval(() => {
    const video = document.querySelector("video");
    const adShowing = document.querySelector(".ad-showing");

    if (adShowing && video) {
      video.muted = true;
      video.playbackRate = 16;

      const skipBtn = document.querySelector(".ytp-skip-ad-button");
      if (skipBtn) skipBtn.click();
    }

    if (!adShowing && video) {
      video.muted = false;
      video.playbackRate = 1;
    }

    document
      .querySelectorAll(
        ".ytp-ad-overlay-container, ytd-display-ad-renderer"
      )
      .forEach(ad => ad.remove());
  }, 500);
}

function stopBlocking() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  const video = document.querySelector("video");
  if (video) {
    video.muted = false;
    video.playbackRate = 1;
  }
}
