var { ipcMain, BrowserWindow} = require('electron')

var path = require('path');

var win = null;

ipcMain.on('openWindow', function (event,aid) {
    //获取当前窗口的对象返回给父页面信息用的 ，放在上面是第一个窗口，放在这里是第二个v 窗口
    var winId = BrowserWindow.getFocusedWindow().id

    win = new BrowserWindow({
        width: 400,
        height: 400
    })
    win.loadURL(path.join('file:', __dirname, '../xrjctx.html'))

    win.webContents.openDevTools()
    
    //获取openWindow 传过来的参数 监听当前窗口加载完成的事件
    win.webContents.on('did-finish-load',(event)=>{
        win.webContents.send('toxrjctx',aid,winId)//winId 传送的是第一个窗口
    })

    
    console.log(winId)
    win.on('closed', function () {
        win = null
    })
})

