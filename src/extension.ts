import * as vscode from 'vscode';

import RosbagConfiguration from './configuration';
import {RosbagContentProvider, RosbagInfoProvider} from './rosbag-content-provider';

export function activate(context: vscode.ExtensionContext) {
  const config = new RosbagConfiguration();
  const ext_path =
      vscode.extensions.getExtension('lochbrunner.vscode-rosbag').extensionPath;

  const previewCmd = () => config.previewCmdPath || `${ext_path}/tools/read.py`;

  const contentProvider = new RosbagContentProvider(previewCmd);
  const contentRegistration =
      vscode.workspace.registerTextDocumentContentProvider(
          'rosbag-preview', contentProvider);

  const infoProvider = new RosbagInfoProvider();
  const infoRegistration = vscode.workspace.registerTextDocumentContentProvider(
      'rosbag-info', infoProvider);

  const openEvent = vscode.workspace.onDidOpenTextDocument(
      (document: vscode.TextDocument) => {
        showDocument(document);
      });

  const previewCommand = vscode.commands.registerCommand(
      'rosbag.preview', (uri: vscode.Uri) => {showPreview(uri)});

  const infoCommand = vscode.commands.registerCommand(
      'rosbag.info', (uri: vscode.Uri) => {showInfo(uri)});


  context.subscriptions.push(
      contentRegistration, infoRegistration, previewCommand, infoCommand,
      openEvent);
}

function showPreview(uri: vscode.Uri): void {
  if (uri.scheme === 'rosbag-preview') {
    return;
  }

  vscode.commands
      .executeCommand('vscode.open', uri.with({scheme: 'rosbag-preview'}))
      .then(null, vscode.window.showErrorMessage);
}

function showInfo(uri: vscode.Uri): void {
  if (uri.scheme === 'rosbag-info') {
    return;
  }

  vscode.commands
      .executeCommand('vscode.open', uri.with({scheme: 'rosbag-info'}))
      .then(null, vscode.window.showErrorMessage);
}

function showDocument(document: vscode.TextDocument): void {
  if (document.languageId === 'rosbag' &&
      (document.uri.scheme !== 'rosbag-preview' &&
       document.uri.scheme !== 'rosbag-info')) {
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')
        .then(() => {
          showPreview(document.uri);
        }, vscode.window.showErrorMessage);
  }
}

export function deactivate() {}