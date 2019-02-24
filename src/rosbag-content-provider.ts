import {TextDocumentContentProvider, Uri} from 'vscode';

import {load_rospy} from './load-rosbag';

export default class RosbagContentProvider implements
    TextDocumentContentProvider {
  private ext_path: string;
  constructor(ext_path: string) {
    this.ext_path = ext_path;
  }
  public async provideTextDocumentContent(uri: Uri): Promise<string|undefined> {
    return await load_rospy(this.ext_path, uri.path);
  }
}