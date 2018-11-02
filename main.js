var electron = require('electron') //引入
//创建实例
var app = electron.app

//nodejs中的path模块
var path = require('path');

//创建 electron BrowserWindonw的引用
var BrowserWindow = electron.BrowserWindow;
//保存 变量
var mainWindow = null

//页面加载的时候创建是咧
app.on('ready', function () {
  //创建实例打开window窗口 的宽高
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500
  })

  // 开启渲染模式中的 tian.
  mainWindow.webContents.openDevTools()
  //把index加载到窗口里面
  // mainWindow.loadFile('index.html');
  mainWindow.loadURL(path.join('file:', __dirname, 'index.html'));

  //监听关闭窗口
  mainWindow.on('closed', () => {
    mainWindow = null
  })

})