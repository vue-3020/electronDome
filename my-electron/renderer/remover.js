//渲染进程
var path = require('path')
var remover = document.querySelector('#remover')
//渲染进程没法直接调用主进程中的模块，但是我们可以通过，electron中的removet模块间接的的调用住进程

var BrowserWindow = require('electron').remote.BrowserWindow
//指向窗口对象的一个全局引用，如果没有这个引用，那么当该 javascript 对象被垃圾回收
//的
var win = null
remover.onclick = function () {
    //打开新窗口
    win = new BrowserWindow({
        width: 400,
        height: 400,
        // frame:false, //true弹窗周边菜单隐藏
        // fullscreen:false //是否true全屏
    })
    //打开指定路径
    win.loadURL(path.join('file:',__dirname,'news.html'))
    //关闭
    win.on('closed',()=>{
        win = null
    })
}