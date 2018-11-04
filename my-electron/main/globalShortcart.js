//在主进程里进行快捷键

var {globalShortcut,app} = require('electron')

//在ready中注册事件 可以监听多个在main中也有一个
app.on('ready',function(){
    globalShortcut.register('ctrl+e',function(){
        console.log('ctrl+e')
    })

    //检测是否注册 
    console.log(globalShortcut.isRegistered('ctrl+e'))
})

//要退出的时候取消全局快捷键
app.on('will-quit',function(){
    globalShortcut.unregister('ctrl+e')
})