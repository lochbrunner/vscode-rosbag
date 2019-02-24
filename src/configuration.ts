import {workspace, WorkspaceConfiguration} from 'vscode';

export default class RosbagConfiguration {
  public get previewCmdPath(): string|null {
    return this.configuration.get('rosbag.previewCmdPath', null);
  }

  public constructor() {
    const configuration = workspace.getConfiguration();
    this.configuration = configuration;
  }

  private readonly configuration: WorkspaceConfiguration;
}