import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

let fetchInterval: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext) {
	console.log('Auto-Fetch GitHub Extension is starting...');

	// Check if a Git Repository is available
	if (!isGitRepositoryAvailable()) {
		console.log('No Git Repository found - Extension remains inactive');
		vscode.window.showWarningMessage('Auto-Fetch GitHub: No Git Repository found in workspace. Extension is inactive.');
		return;
	}

	vscode.window.showInformationMessage('Auto-Fetch GitHub Extension is active!');

	// Get user-configured interval
	const config = vscode.workspace.getConfiguration('autoFetchGithub');
	const intervalMinutes = config.get<number>('interval', 10);

	console.log(`Starting Auto-Fetch with ${intervalMinutes} minute interval`);
	startAutoFetch(intervalMinutes);

	// Workspace-Änderungen überwachen
	const workspaceWatcher = vscode.workspace.onDidChangeWorkspaceFolders(() => {
		console.log('Workspace folders changed - checking Git Repository...');
		if (!isGitRepositoryAvailable()) {
			console.log('Git Repository no longer available - stopping Auto-Fetch');
			stopAutoFetch();
			vscode.window.showWarningMessage('Auto-Fetch GitHub: Git Repository no longer available - Auto-Fetch stopped.');
		} else if (!fetchInterval) {
			console.log('Git Repository available again - starting Auto-Fetch');
			const config = vscode.workspace.getConfiguration('autoFetchGithub');
			const intervalMinutes = config.get<number>('interval', 10);
			startAutoFetch(intervalMinutes);
			vscode.window.showInformationMessage('Auto-Fetch GitHub: Git Repository detected - Auto-Fetch started.');
		}
	});

	// Watch for configuration changes
	const configWatcher = vscode.workspace.onDidChangeConfiguration((event) => {
		if (event.affectsConfiguration('autoFetchGithub.interval')) {
			console.log('Auto-Fetch interval configuration changed');
			if (fetchInterval) {
				stopAutoFetch();
				const config = vscode.workspace.getConfiguration('autoFetchGithub');
				const newInterval = config.get<number>('interval', 10);
				console.log(`Restarting Auto-Fetch with new ${newInterval} minute interval`);
				startAutoFetch(newInterval);
			}
		}
	});

	context.subscriptions.push(
		workspaceWatcher,
		configWatcher,
		{
			dispose: () => {
				stopAutoFetch();
			}
		}
	);
}

function isGitRepositoryAvailable(): boolean {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders || workspaceFolders.length === 0) {
		return false;
	}

	// Check every workspace folder for .git directory
	for (const folder of workspaceFolders) {
		const gitPath = path.join(folder.uri.fsPath, '.git');
		if (fs.existsSync(gitPath)) {
			console.log(`Git Repository found in: ${folder.uri.fsPath}`);
			return true;
		}
	}

	console.log('No Git Repository found in workspace folders');
	return false;
}

function stopAutoFetch() {
	if (fetchInterval) {
		clearInterval(fetchInterval);
		fetchInterval = undefined;
		console.log('Auto-Fetch timer stopped');
	}
}

function startAutoFetch(intervalMinutes: number) {
	// Set interval timer
	fetchInterval = setInterval(() => {
		autoFetch();
	}, intervalMinutes * 60 * 1000);

	// Execute once immediately on start
	autoFetch();
}

function autoFetch() {
	// Re-check if Git Repository is still available
	if (!isGitRepositoryAvailable()) {
		console.log('Git Repository no longer available - stopping Auto-Fetch');
		stopAutoFetch();
		vscode.window.showWarningMessage('Auto-Fetch GitHub: Git Repository no longer available - Auto-Fetch stopped.');
		return;
	}

	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders) {
		console.log('No workspace folder found');
		return;
	}

	// Find the first folder with Git Repository
	let repoPath: string | null = null;
	for (const folder of workspaceFolders) {
		const gitPath = path.join(folder.uri.fsPath, '.git');
		if (fs.existsSync(gitPath)) {
			repoPath = folder.uri.fsPath;
			break;
		}
	}

	if (!repoPath) {
		console.log('No Git Repository found');
		return;
	}

	console.log(`Running git fetch in: ${repoPath}`);

	exec('git fetch', { cwd: repoPath }, (error, stdout, stderr) => {
		if (error) {
			console.error('Git Fetch Error:', stderr);
			// Check if it's a Git-specific error
			if (stderr.includes('not a git repository') || stderr.includes('No such file or directory')) {
				vscode.window.showErrorMessage(`Git Repository Error: ${stderr}`);
				stopAutoFetch();
			} else {
				vscode.window.showWarningMessage(`Git Fetch Warning: ${stderr}`);
			}
			vscode.window.setStatusBarMessage(`Git Fetch Error: ${stderr}`, 5000);
			return;
		}
		// Brief info in status bar and console
		console.log('Git fetch executed successfully');

		const config = vscode.workspace.getConfiguration('autoFetchGithub');
		const showNotifications = config.get<boolean>('showNotifications', true);

		if (showNotifications) {
			vscode.window.showInformationMessage('Git fetch executed successfully.');
		}
		vscode.window.setStatusBarMessage('Git fetch executed successfully.', 3000);
	});
}

export function deactivate() {
	console.log('Auto-Fetch GitHub Extension is being deactivated...');
	stopAutoFetch();
}
