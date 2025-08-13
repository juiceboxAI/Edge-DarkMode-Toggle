const CSS_FILE = 'dark-mode.css';

document.addEventListener('DOMContentLoaded', () => {
    const lightswitch = document.getElementById('lightswitch-img');

    // A helper function to get the origin of the current active tab
    async function getCurrentOrigin() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            return tab && tab.url ? new URL(tab.url).origin : null;
        } catch (e) {
            return null; // For invalid URLs like about:blank
        }
    }

    // This function now lives here and applies the theme to the page
    async function applyThemeToPage(isEnabled) {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab || !tab.id) return;

            // Hard reset: Always remove first to prevent conflicts
            await chrome.scripting.removeCSS({
                target: { tabId: tab.id, allFrames: true },
                files: [CSS_FILE],
            }).catch(err => {});

            if (isEnabled) {
                await chrome.scripting.insertCSS({
                    target: { tabId: tab.id, allFrames: true },
                    files: [CSS_FILE],
                });
            }
        } catch (err) {
            console.error("Failed to apply theme from popup:", err);
        }
    }

    // This function updates the image to reflect the current state
    async function updateSwitchImage() {
        const origin = await getCurrentOrigin();
        if (!origin) {
            lightswitch.style.opacity = '0.5'; // Visually disable on invalid pages
            return;
        }
        const { siteSettings = {} } = await chrome.storage.local.get(['siteSettings']);
        const isEnabled = !!siteSettings[origin];
        lightswitch.src = isEnabled ? 'images/lightswitch-on.png' : 'images/lightswitch-off.png';
    }

    // Set the initial image when the popup opens
    updateSwitchImage();

    // Listen for a click on the lightswitch image
    lightswitch.addEventListener('click', async () => {
        const origin = await getCurrentOrigin();
        if (!origin) return; // Don't do anything on invalid pages

        // 1. Get the current settings and determine the NEW state by flipping the old one
        const { siteSettings = {} } = await chrome.storage.local.get(['siteSettings']);
        const newIsEnabled = !siteSettings[origin]; // Flip the current value
        siteSettings[origin] = newIsEnabled;

        // 2. Save the updated settings object
        await chrome.storage.local.set({ siteSettings });

        // 3. Immediately update the image and apply the theme to the page
        lightswitch.src = newIsEnabled ? 'images/lightswitch-on.png' : 'images/lightswitch-off.png';
        applyThemeToPage(newIsEnabled);
    });
});