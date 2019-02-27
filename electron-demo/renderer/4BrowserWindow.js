//渲染进程没法直接调用主进程中的模块，但是我们可以通过 electron中的remote模块间接的调用主进程中的模块
var path = require('path');
var BrowserWindow = require('electron').remote.BrowserWindow;

var win = null;

var btn3 = document.querySelector('#btn3');
btn3.onclick = () => {
    win = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
    }, )
    win.webContents.openDevTools();
    win.loadURL(path.join('file:', __dirname, 'BrowserWindow.html'));

    //渲染进程和渲染进程通信,、监听当前窗口加载完成的事件
    win.webContents.on('did-finish-load', (event) => {
        win.webContents.send('toNews', '12345678')
    })

    win.on('close', () => {
        win = null
    });

    //(1)渲染进程和渲染进程的通讯
    localStorage.setItem("keys", '123');
}