//头部菜单

/*
var electron = require('electron')
var Menu = electron.Menu

// 上面的内容 es6 一行搞定
const {Menu} = require('electron')

//shell 可以在主进程使用页可以在渲染进程使用
*/
const {
    Menu,
    shell,
    BrowserWindow
} = require('electron');

//在浏览器打开
function opentWeb(url){
    shell.openExternal(url)
}

//在webview里面打开
function opentWebView(url){
    //获取打开的窗口 
    var win = BrowserWindow.getFocusedWindow()
    //广播给 webview.js 中
    win.webContents.send('openWebview',url)
}

//定义菜单
var template = [{
        label: '文件1',
        submenu: [{
                label: '新建文件',
                accelerator: 'ctrl+n',
                click: function () {
                    console.log('ctrl+n');
                }
            },
            {

                label: '新建窗口',
                click: function () {
                    console.log('new window');
                }
            }
        ]
    },
    {

        label: '编辑2',
        submenu: [{
                label: '复制',
                role: 'copy'
            },
            {
                label: '截切',
                role: 'cut'
            }
        ]
    },
    {

        label: '链接切换',
        submenu: [{
                label: '链接切换百度',
                click:  function(){
                    opentWeb('https://www.baidu.com/')
                }
            },
            {
                label: '链接切换淘宝',
                click: function(){
                    opentWeb('https://www.taobao.com/')
                } 
            }
        ]
    },
    {

        label: '在webview里打开内容',
        submenu: [{
                label: '链接切换腾讯',
                click:  function(){
                    opentWebView('https://v.qq.com/')
                }
            },
            {
                label: '链接切换爱奇艺',
                click: function(){
                    opentWebView('https://www.iqiyi.com/')
                } 
            }
        ]
    }
]

var m = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(m);
//因此自带菜单
// Menu.setApplicationMenu(nill);