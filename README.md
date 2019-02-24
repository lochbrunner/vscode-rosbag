# Rosbag Preview

![Screenshot](https://raw.githubusercontent.com/lochbrunner/vscode-rosbag/master/docs/screen.png)

## Prerequisites

* Python 2 installed (`python2` command globally available)
* Python packages rosbag and rospy installed

## Installation

Because very early development phase this extension is not yet published to the VS Code extension registry. Therefore you have to pack this yourself.

```basn
git clone https://github.com/lochbrunner/vscode-rosbag.git
cd vscode-rosbag
npm install
npm run compile
npm install -g vsce
vsce package
```

Now you can install the VSIX package within your VS Code.