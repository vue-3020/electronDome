//主进程
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// 指向窗口对象的一个全局引用，如果没有这个引用，那么当该javascript对象被垃圾回收的
// 时候该窗口将会自动关闭
let mainWindow

function createWindow () {
  // 创建一个新的浏览器窗口
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // 加载应用程序的 index页面
  mainWindow.loadFile('index.html')

  // 打开开发工具页面.
  mainWindow.webContents.openDevTools()

  // 当窗口关闭时调用的方法
  mainWindow.on('closed', function () {
    // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里
    // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
    mainWindow = null
  })
}

// 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
// 有些API只能在该事件发生后才能被使用。
app.on('ready', createWindow)

// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', function () {
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
