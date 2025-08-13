# Edge-DarkMode-Toggle
Easy dark mode toggle for those stubborn sites and tools. Works with Google Docs and Sheets. Provides per-site settings with a unique, custom light switch interface. It remembers your dark mode preference for each tab individually, giving you granular control over your Browse experience.

## Features
💡 Per-Site Memory: Remembers your dark/light mode preference for each individual website. For example, google.com can be dark while wikipedia.org remains light.

🎨 Custom UI: Features a unique, clickable light switch image as its interface instead of a standard browser toggle.

🚀 Automatic Application: Instantly applies your chosen theme when you load a page, thanks to a persistent background script that respects your per-site rules.

💪 Robust Design: Built to handle complex, dynamic web applications by intelligently applying and removing styles.

## Installation
This extension is loaded manually in Developer Mode.

Get the code: Clone or download the project files to a folder on your computer.

Open Edge Extensions: Navigate to edge://extensions in your address bar.

Enable Developer Mode: In the bottom-left corner, turn on the "Developer mode" toggle.

Load the Extension: Click the "Load unpacked" button and select the project folder.

The light switch icon will now appear in your Edge toolbar.

## How to Use
Navigate to any website.

Click the extension's icon in the toolbar to show the popup.

Click the light switch image to toggle dark mode on or off for that specific site.

Your choice is saved automatically and will be applied the next time you visit that website.

## Technology Stack
Manifest V3: The modern standard for secure and performant browser extensions.

HTML5 / CSS3: Used for the structure and custom styling of the popup interface.

JavaScript (ES6+ Async/Await): Powers all the logic for the popup, background processes, and state management.

Browser APIs:
chrome.storage: To persistently save the per-site settings.

chrome.scripting: To dynamically inject and remove the dark mode CSS.

chrome.tabs: To interact with browser tabs and get page information.
