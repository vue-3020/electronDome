var btn = document.querySelector('#btn');
var path = require('path');
// BrowerWindow 是住进程的模块，在渲染进程被调用
var BrowerWindow = require('electron').remote.BrowserWindow;
btn.onclick = () => {
    win = new BrowerWindow({
            width: 500,
            height: 500,
            frame: false, // 隐藏菜单
            // fullscreen: true, //全屏展示
            // transparent: true // 背景透明
        })
        //新窗口页面 
    win.loadURL(path.join('file:', __dirname, 'news.html'));
    //关闭
    win.on('close', () => {
        win = null
    });
}