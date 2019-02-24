import {TextDocumentContentProvider, Uri} from 'vscode';

import {get_rosbag_info, load_content_rospy} from './load-rosbag';

export class RosbagContentProvider implements TextDocumentContentProvider {
  private ext_path: string;
  constructor(ext_path: string) {
    this.ext_path = ext_path;
  }
  public async provideTextDocumentContent(uri: Uri): Promise<string|undefined> {
    return await load_content_rospy(this.ext_path, uri.path);
  }
}

export class RosbagInfoProvider implements TextDocumentContentProvider {
  public async provideTextDocumentContent(uri: Uri): Promise<string|undefined> {
    return await get_rosbag_info(uri.path);
  }
}