import {TextDocumentContentProvider, Uri} from 'vscode';

export default class RosbagContentProvider implements
    TextDocumentContentProvider {
  public async provideTextDocumentContent(uri: Uri): Promise<string|undefined> {
    return `Hi there! I am a rosbag ${uri.path} ${uri.scheme}`;
  }
}