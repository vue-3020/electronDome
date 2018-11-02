## **下载地址**

```
github地址：https://github.com/electron/electron
```

## **下载的三种方法**

第一 克隆的方法

```
# 克隆示例项目的仓库
git clone https://github.com/electron/electron-quick-start

#进入这个仓库
cd electron-quick-start

#装依赖运行
npm install

#运行
npm start
```

第二 手动搭建项目；

- 1、新建一个项目目录 例如：electrondemo01
- 2、在 electrondemo01 目录下面新建三个文件: index.html、main.js 、package.json
- 3、index.html 里面用 css 进行布局（以前怎么写现在还是怎么写）
- 4、在 main.js 中写如下代码：

```
var electron = require('electron') //(1)引入
//(2)创建实例
var app = electron.app

//nodejs中的path模块
var path = require('path');

//(4)创建 electron BrowserWindonw的引用
var BrowserWindow = electron.BrowserWindow;
//(4)保存 变量
var mainWindow = null

//(5)页面加载的时候创建是咧
app.on('ready', function () {
  //(6)创建实例打开window窗口 的宽高
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500
  })

  // (7)开启渲染模式中的 tian.
  mainWindow.webContents.openDevTools()
  //(8)把index加载到窗口里面
  // mainWindow.loadFile('index.html');
  mainWindow.loadURL(path.join('file:', __dirname, 'index.html'));

  //(9)监听关闭窗口
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

运行项目 空格点
electron .
```

第三种通过全局插件安装 electron-forge

> electron-forge 相当于 electron 的一个脚手架，可以让我们更方便的创建、运行、打包
> electron 项目。

```
npm install -g electron-forge
electron-forge init my-new-app
cd my-new-app
npm star
```

## **通过渲染进程读取本地文件**

```
var fs = require('fs');
var content = document.getElementById('content');
var button = document.getElementById('button');
button.addEventListener('click',function(e){
fs.readFile('package.json','utf8',function(err,data){
content.textContent = data;
console.log(data);
});
});
```

## **开启 调试模式**

```
mainWindow.webContents.openDevTools();
```

## **node 实现拖拽打开 文件**

```
html代码
<div id="content"><p>拖拽功能</p></div>

js代码
  var content = this.document.querySelector('#content')
  //阻止默认行为
  content.ondragenter = content.ondragover = content.ondragleave = function(){
    return false //组织默认行为
  }

//引入node读写模块
var fs= require('fs')

content.ondrop =function(e){

//阻止默认行为
e.preventDefault();

//获取路径信息
var path = e.dataTransfer.files[0].path
console.log(path)

//读取内容
fs.readFile(path,'utf-8',(err,data)=>{
  if(err){
  console.log(err)
  return false
  }
  
  //写入到content中
  content.innerHTML =data
})
}
```

## **调用主进程，打开新窗口**
```
html
<button id="remover">调用主进程打开新窗口</button>

js代码
//渲染进程
var path = require('path')
var remover = document.querySelector('#remover')
//渲染进程没法直接调用主进程中的模块，但是我们可以通过，electron中的removet模块间接的的调用住进程

var BrowserWindow = require('electron').remote.BrowserWindow
//指向窗口对象的一个全局引用，如果没有这个引用，那么当该 javascript 对象被垃圾回收
的
var win = null
remover.onclick = function () {
    //打开新窗口
    win = new BrowserWindow({
        width: 400,
        height: 400,
        frame:false, //true弹窗周边菜单隐藏
        fullscreen:false //是否true全屏
    })
    //打开指定路径
    win.loadURL(path.join('file:',__dirname,'news.html'))
    //关闭
    win.on('closed',()=>{
        win = null
    })
}
```
## 左侧菜单和头部菜单
在main文件下的menu.js
```
var remote2 = require('electron').remote;
const Menu2 = remote2.Menu;
//定义菜单
var template2 = [{
    label: '(右键)文件',
    submenu: [{
        label: '(右键)新建和点击事件',
        accelerator: 'ctrl+n',
        click: function () {
          console.log('ctrl+n');
        }
      },
      {
        label: '(右键)新建窗口',
        click: function () {
          console.log('new window');
        }
      }
    ]
  },
  {

    label: '(右键)编辑',
    submenu: [{
        label: '(右键)复制11',
        role: 'copy'
      },
      {
        label: '(右键)截切',
        role: 'cut'
      }
    ]
  }
]
//执行方法
var m2 = Menu2.buildFromTemplate(template2);
Menu2.setApplicationMenu(m2);


//右键菜单
window.addEventListener('contextmenu', function (e) {
  //阻止当前窗口默认事件
  e.preventDefault();
  //在当前窗口点击右键的时候弹出  定义的菜单模板
  m2.popup({
    window: remote2.getCurrentWindow()
  })
}, false)

//在main.js主进程中引入这个
require('./main/menu.js')
```

## **主进程与渲染进程通信(同步通信、异步通信**
- Electron  主进程，和渲染进程的通信主要用到两个模块：ipcMain 和 ipcRenderer
- ipcMain ：当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息,
当然也有可能从主进程向渲染进程发送消息
- ipcRenderer： ： 使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主
进程。 也可以接收主进程回复的消息
> 1 渲染进程给主进程发送异步消息
```
//html
<button id="send"> 渲染进程执行主进程里的方法 </button>
//var sendDom = document.querySelector('#send')
//渲染进程执行主进程里的方法
sendDom.onclick = function(){
    //出发主进程的方法 广播,
    ipcRenderer.send('sendM','发送给主进程')
}

//主进程接收
const { ipcMain } = require('electron');
ipcMain.on(''sendM'',(event,arg) => {
  console.log(arg) 
})
```
> 2 渲染进程给主进程发送异步消息，主进程接收到消息以后通知渲染进程
```
<button id="sendreplay"> 渲染进程执行主进程里的方法 </button>

//ipcRenderer.js 获取dom
var sendreplayDom = document.querySelector('#sendreplay')
sendreplayDom.onclick = function(){
    //出发主进程的方法 广播,
    ipcRenderer.send('sendreplay','发送给主进程的第二个内容 aaa')
}

//ipcMain.js 接收渲染进程内容
 ipcMain.on('sendreplay',function(event,data){
    console.log(data)
    //返回给渲染进行消息
    event.sender.send('replay','ok 成功 从主进程返回到渲染进程内容')
 })

//ipcRenderer.js 接收主进程返回来的消息
ipcRenderer.on('replay',function(event,data){
    console.log('渲染进程的内容+ '+ data)
})
```
>渲染进程给主进程发送同步消息
```
//righKeyMenu.js
sendsyncDom.onclick = function(){
  //同步可以直接接收返回值不用等待
   var msg =  ipcRenderer.sendSync('sendsync','第三次发送 同步接收sendSync')
   console.log(msg)
}

//ipcMain.js 接收同步广播 
 ipcMain.on('sendsync',function(event,data){
    console.log(data)
    //渲染进程 返回数据
    event.returnValue = '这是第三次同步返回的数据'
 })
```
