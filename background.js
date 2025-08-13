const CSS_FILE = 'dark-mode.css';

// Listen for new pages loading
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // We only care when the page is fully loaded and has a valid URL
    if (changeInfo.status === 'complete' && tab.url) {
        try {
            const origin = new URL(tab.url).origin;
            const { siteSettings = {} } = await chrome.storage.local.get(['siteSettings']);

            // Hard reset the CSS on every page load
            await chrome.scripting.removeCSS({
                target: { tabId: tabId, allFrames: true },
                files: [CSS_FILE],
            }).catch(e => {});

            // If the current site is in our settings and is set to true, inject the CSS
            if (siteSettings[origin]) {
                await chrome.scripting.insertCSS({
                    target: { tabId: tabId, allFrames: true },
                    files: [CSS_FILE],
                });
            }
        } catch (e) {
            // This catches errors for invalid URLs like chrome://
        }
    }
});