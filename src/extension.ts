import * as vscode from 'vscode';
import RosbagContentProvider from './rosbag-content-provider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Activating Extension...');
  const provider = new RosbagContentProvider();
  const registration = vscode.workspace.registerTextDocumentContentProvider(
      'rosbag-preview', provider);

  const openEvent = vscode.workspace.onDidOpenTextDocument(
      (document: vscode.TextDocument) => {
        showDocument(document);
      });

  const previewCommand = vscode.commands.registerCommand(
      'rosbag.preview', (uri: vscode.Uri) => {showPreview(uri)});


  context.subscriptions.push(registration, previewCommand, openEvent);
}

function showPreview(uri: vscode.Uri): void {
  if (uri.scheme === 'rosbag-preview') {
    return;
  }

  vscode.commands
      .executeCommand('vscode.open', uri.with({scheme: 'rosbag-preview'}))
      .then(null, vscode.window.showErrorMessage);
}

function showDocument(document: vscode.TextDocument): void {
  if (document.languageId === 'rosbag' &&
      document.uri.scheme !== 'rosbag-preview') {
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')
        .then(() => {
          showPreview(document.uri);
        }, vscode.window.showErrorMessage);
  }
}

export function deactivate() {}