import {TextDocumentContentProvider, Uri} from 'vscode';

import {get_rosbag_info, load_content_rospy} from './load-rosbag';

export class RosbagContentProvider implements TextDocumentContentProvider {
  private cmd: () => string;
  constructor(cmd: () => string) {
    this.cmd = cmd;
  }
  public async provideTextDocumentContent(uri: Uri): Promise<string|undefined> {
    return await load_content_rospy(this.cmd(), uri.path);
  }
}

export class RosbagInfoProvider implements TextDocumentContentProvider {
  public async provideTextDocumentContent(uri: Uri): Promise<string|undefined> {
    return await get_rosbag_info(uri.path);
  }
}