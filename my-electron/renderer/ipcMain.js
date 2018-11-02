//主进程
var {ipcMain} = require('electron')

//主进程接收渲染进程的内容 广播过来的数据  在主进程中引入
 ipcMain.on('sendM',function(event,data){
    console.log(data)
 })


 // 接收第二个内容 
 ipcMain.on('sendreplay',function(event,data){
    console.log(data)
    //返回给渲染进行消息
    event.sender.send('replay','ok 成功 从主进程返回到渲染进程内容')
 })


 //接收同步广播 
 ipcMain.on('sendsync',function(event,data){
    console.log(data)
    //渲染进程 返回数据
    event.returnValue = '这是第三次同步返回的数据'
 })