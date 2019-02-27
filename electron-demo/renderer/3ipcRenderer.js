const {
    ipcRenderer
} = require('electron')

//渲染进程发送给主进程内容
ipcRenderer.send('msg', {
    name: '123456789'
}); //异步

//渲染进程接收返回的消息
ipcRenderer.on('reply', function(event, arg) {
    console.log(arg);
})