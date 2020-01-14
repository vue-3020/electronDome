var electron = require('electron') //引入
//创建实例
var app = electron.app //控制生命周期模块

//在mac下页面导航不显示在笔记本最上方 （隐藏窗体菜单）
// app.dock.hide()

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
        webPreferences: {
            nodeIntegration: true //如果不写这个  有些浏览器属性不能用
        }
        // frame:false, //true弹窗周边菜单隐藏
    })

    // 开启渲染模式中的 开启控制台 托盘不表不显示
    mainWindow.webContents.openDevTools()
    //把index加载到窗口里面
    // mainWindow.loadFile('index.html');
    mainWindow.loadURL(path.join('file:', __dirname, 'index.html'));


    // 系统托盘
    require('./main/trays.js');
    //监听关闭窗口

    mainWindow.on('closed', (e) => {

        e.preventDefault() //阻止默认行为
        mainWindow = null
    })


    //(4)执行菜单操作
    require('./main/menu.js');

    //主进程的分支 解决 渲染进程和主进程的通讯
    require('./main/ipcMain.js');

    //渲染进程和渲染进程通讯
    require('./main/xrjctx.js')



}

app.on('ready', createWindow)
// 页面一进来就夹在内容

require('./main/globalShortcart.js')

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