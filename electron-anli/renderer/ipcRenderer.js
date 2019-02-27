var {ipcRenderer} = require('electron')
var sendDom = document.querySelector('#send')
var sendreplayDom = document.querySelector('#sendreplay')
var sendsyncDom = document.querySelector('#sendsync')

//渲染进程执行主进程里的方法
sendDom.onclick = function(){
    //出发主进程的方法 广播,
    ipcRenderer.send('sendM','发送给主进程')
}


sendreplayDom.onclick = function(){
    //出发主进程的方法 广播,
    ipcRenderer.send('sendreplay','发送给主进程的第二个内容 aaa')
}
//接收主进程返回值
ipcRenderer.on('replay',function(event,data){
    console.log('渲染进程的内容+ '+ data)
})

//同步通讯
sendsyncDom.onclick = function(){
   var msg =  ipcRenderer.sendSync('sendsync','第三次发送 同步接收sendSync')

   console.log(msg)
}