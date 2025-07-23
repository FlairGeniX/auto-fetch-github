# Auto-Fetch GitHub

A VS Code extension that automatically runs `git fetch` on open Git repositories at configurable intervals.

## Features

- **Automatic Git Fetch**: Periodically fetches updates from remote repositories
- **Smart Repository Detection**: Only activates when Git repositories are present in the workspace
- **Configurable Intervals**: Set custom fetch intervals from 30 seconds to 24 hours
- **Notification Control**: Enable/disable success notifications
- **Real-time Configuration**: Changes to settings are applied immediately without restart
- **Multi-Repository Support**: Automatically detects and works with Git repositories in workspace
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

### 0.0.1

Initial release of Auto-Fetch GitHub extension featuring:
- Automatic git fetch functionality
- Configurable intervals
- Smart repository detection
- Notification controls

---

**Enjoy!**
