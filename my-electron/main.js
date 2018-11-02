var electron = require('electron') //引入
//创建实例
var app = electron.app //控制生命周期模块

//nodejs中的path模块
var path = require('path');

//创建 electron BrowserWindonw的引用
var BrowserWindow = electron.BrowserWindow; //BrowserWindow 和窗口相关的模块
//保存 变量
var mainWindow = null

//页面加载的时候创建是咧
function createWindow() {
    //创建实例打开window窗口 的宽高
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        frame:false, //true弹窗周边菜单隐藏
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
    //(4)执行菜单操作
    require('./main/menu.js')

    // 在主进程中引入 依赖
    require('./renderer/ipcMain.js')
}
app.on('ready', createWindow)

//页面全部关闭
app.on('window-all-clod', function () {
    // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
    // 窗口打开
    if (mainWindow === null) {
        createWindow()
    }
})