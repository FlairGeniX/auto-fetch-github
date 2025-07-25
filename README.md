# Auto-Fetch GitHub

A VS Code extension that automatically runs `git fetch` on open Git repositories at configurable intervals.

## Features

- **Automatic Git Fetch**: Periodically fetches updates from remote repositories
- **Smart Repository Detection**: Only activates when Git repositories are present in the workspace
- **Configurable Intervals**: Set custom fetch intervals from 30 seconds to 24 hours
- **Notification Control**: Enable/disable success notifications
- **Real-time Configuration**: Changes to settings are applied immediately without restart
- **Error Handling**: Intelligent error detection and handling for Git-related issues

## Requirements

- Git must be installed and available in your system PATH
- At least one Git repository must be open in your VS Code workspace

## Extension Settings

This extension contributes the following settings:

* `autoFetchGithub.interval`: Set the interval in minutes for automatic git fetch (0.5 - 1440 minutes, default: 10)
* `autoFetchGithub.showNotifications`: Enable/disable notification messages when git fetch is executed (default: true)

## Usage

1. Open a workspace containing Git repositories
2. The extension will automatically start when VS Code loads
3. Configure your preferred fetch interval in VS Code Settings (Ctrl+,)
4. The extension will periodically fetch updates from remote repositories

## Known Issues

- The extension requires Git to be installed and available in system PATH
- Only works with local Git repositories (not remote workspaces)

## Release Notes

### 1.0.3

Various bugfixes and improvements

### 1.0.2

Latest release featuring:
- Extension icon for better marketplace visibility
- Corrected marketplace release notes display

### 1.0.1

Bug fixes and improvements:
- Corrected marketplace description
- Removed premature multi-repository support claims

### 1.0.0

Stable release of Auto-Fetch GitHub extension featuring:
- Automatic git fetch functionality
- Configurable intervals (0.5 - 1440 minutes)
- Smart repository detection
- Notification controls
- Real-time configuration updates
- Intelligent error handling

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License.

**What this means:**
- ✅ You can share, copy, and redistribute the material
- ✅ You can adapt, remix, and build upon the material
- ❌ You cannot use the material for commercial purposes
- ⚠️ Attribution is required - you must give appropriate credit

For full license details, see the [LICENSE](LICENSE) file or visit [Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

---

**Enjoy!**
