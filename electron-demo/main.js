//主进程，操作外壳的
//引入 electron模块
var electron = require('electron');

//创建引用
const app = electron.app;
let path = require('path')

//控制窗口的引用
const BrowserWindow = electron.BrowserWindow;

//变量保存 对变量窗口的引用
let mainWindow = null;

//打开窗口
app.on('ready', function() {
    //创建实例 设置宽高
    mainWindow = new BrowserWindow({ width: 1000, height: 800 });

    //把index.html加载窗口
    mainWindow.loadFile('index.html');

    //通过路径加载index.html
    // mainWindow.loadURL(path.join('file:', __dirname, "index.html"));

    //开启调试模式
    mainWindow.webContents.openDevTools();

    //ipcMain 和 ipcRenderer 模块 主进程和渲染进程之间的通讯（同步和异步）
    require('./main/ipcMain.js');

    //设置任务栏图标
    require('./main/icon.js');

    //关闭窗口 要把mainWindow 销毁
    mainWindow.on('closed', function() {
        mainWindow = null;
    })
})


//监听所有窗口关闭的事件
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})