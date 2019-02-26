 //主进程，操作外壳的
 //引入 electron模块
 var electron = require('electron');

 //创建引用
 const app = electron.app;
 let path = require('path')

 //控制窗口的引用  布瓦泽window
 const BrowserWindow = electron.BrowserWindow;

 //变量保存 对变量窗口的引用
 let mainWindow = null;

 //打开窗口
 app.on('ready', function() {
     //创建实例 设置宽高
     mainWindow = new BrowserWindow({ width: 800, height: 600 });
     //把index.html加载窗口
     mainWindow.loadFile('index.html');

     //通过路径加载index.html
     // mainWindow.loadURL(path.join('file:', __dirname, "index.html"));

     //开启调试模式
     mainWindow.webContents.openDevTools();
     //关闭窗口 要把mainWindow 销毁
     mainWindow.on('closed', function() {
         mainWindow = null;
     })
 })


 //监听所有窗口关闭的事件，和最小化有区分
 app.on('window-all-closed', function() {
     if (process.platform !== 'darwin') {
         app.quit();
     }
 })