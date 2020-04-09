# phaser-project-typescript
phaser engine by typescript, needn't web side, just vscode, and press F5, you can debug your game project

### 前置条件
需要安装nodejs
vscode中需要安装debugger for chorme插件
全局需要安装gulp，`npm i gulp -g`

### 使用方法

方法1. 可以直接将本项目clone到本地，然后在client目录中调用`npm i`，即可在vscode中按下F5来调试项目，

方法2. 可以调用`npm i phasercp -g`; 然后在你想要生成项目的文件夹里，shift+右键，选择在此处打开PowerShell窗口.
		输入：`psrcp projectname` or `psrcp projectname 3.22.0`之类的命令，即可等待项目生成完毕，同样可以使用F5来调试