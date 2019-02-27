//主进程接收
var { ipcMain } = require('electron');

ipcMain.on("msg", (event, arg) => {
    console.log(arg); //不再控制台


    //接收后返回给渲染进程
    event.sender.send('reply', 'pong');
})