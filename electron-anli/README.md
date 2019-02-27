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

#运行 或者 
npm start
或 点执行
electron .
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
## **渲染进程和渲染进程之间的通讯**
 第一种 通过localStorage进行页面通讯
```
//渲染页面发送存储
var {ipcRenderer} =require('electron');
var xuanRanBtn = document.querySelector('#xuanRan')
xuanRanBtn.onclick = function(){
   ipcRenderer.send('openWindow') 
   var count = '通过localStorage，传递到渲进程，在弹窗打开'
   localStorage.setItem('aid',count)
}

//渲染页面接收 xrjctx.thml
var aid = localStorage.getItem('aid')
var box1 = document.querySelector('#box1')
console.log(aid)
box1.innerHTML = aid
```
第二种通过 BrowserWindow 和 webContents 模块实现渲染进 程和渲染进程的通信。
> openWindow.js --> xrjctx.js-->xrjctc.html 
```
// openWindow.js 文件
var {ipcRenderer} =require('electron');
var xuanRanBtn = document.querySelector('#xuanRan')
xuanRanBtn.onclick = function(){
// 通过ipcRenderer 穿参数
   var aid = '通过ipcRenderer 穿参数11111111'
   ipcRenderer.send('openWindow',aid) 
}

// 主进程 xrjctx.js
var path = require('path');
var win = null;
ipcMain.on('openWindow', function (event,aid) {
    win = new BrowserWindow({
        width: 400,
        height: 400
    })
    win.loadURL(path.join('file:', __dirname, '../xrjctx.html'))
    win.webContents.openDevTools()

    win.webContents.on('did-finish-load',(event)=>{
    win.webContents.send('toxrjctx',aid)//winId 传送的是第一个窗口
    })

    win.on('closed', function () {
        win = null
    })
})

// xrjctc.html 接收
var box2 = document.querySelector('#box2')
var {ipcRenderer} =require('electron');
ipcRenderer.on('toxrjctx',(event,aid2)=>{
    box2.innerHTML = aid2
})
```
第三种 子页面返回给父页面值
```
// xrjctx.js 页面
ipcMain.on('openWindow', function (event,aid) {
    //获取当前窗口的对象返回给父页面信息用的 ，放在上面是第一个窗口，放在这里是第二个v 窗口
    var winId = BrowserWindow.getFocusedWindow().id

    //获取openWindow 传过来的参数 监听当前窗口加载完成的事件
    win.webContents.on('did-finish-load',(event)=>{
        win.webContents.send('toxrjctx',aid,winId)//winId 传送的是第一个窗口
    })
})

// xrjctc.html返回父页面需要
var BrowserWindow = require('electron').remote.BrowserWindow
ipcRenderer.on('toxrjctx',(event,aid2,winId)=>{
    //子页面 返回给父页面内容
    console.log(winId) //
    var firstWin = BrowserWindow.fromId(winId)
    firstWin.webContents.send('toIndex','返回到父页面的信息')
})

//  openWindow.js接收
var box3= document.querySelector('#box3')
ipcRenderer.on('toIndex',function(event,data){
    box3.innerHTML =data
    console.log(data)
})
```
## **shell 模块 ，打开浏览器**
```
// html
<a id="aDom" href="http://electronjs.org/docs/api/shell"> 点击调用打开外部浏览器</a>

// link.js
//引入模块 属于渲染进程，页属于住进程
var {shell} =require('electron')
var aDom = document.querySelector('#aDom')

//sheel 打开外部浏览器
aDom.onclick = function(e){
    //阻止默认行为
    e.preventDefault()
    //shell 模块打开 外部浏览器
    var href = this.getAttribute('href')
    shell.openExternal(href)
}
```
## **Electron DOM <webview> 标签**
Webview 与 iframe 有点相似，但是与 iframe 不同, webview 和你的应用运行的是不同的进 程。它不拥有渲染进程的权限，并且应用和嵌入内容之间的交互全部都是异步的。因为这能 保证应用的安全性不受嵌入内容的影响
```
<webview id="webview" src="https://www.baidu.com" style="position:fixed; width:100%; height:100%">
</webview>
```

## **主进程通知渲染进程修改，webview里的href链接变化**
- 用到了主进程向 渲染进程广播内容 win.webContents.send('openWebview',url)
- BrowserWindow获取窗口 win = BrowserWindow.getFocusedWindow()
- 菜单的点击事件
```
 // html
<webview id="webview" src="https://www.baidu.com/" style=" width:100%; height:300px;background: blue">
  </webview>

// 主进程
function opentWebView(url){
    //获取打开的窗口 
    var win = BrowserWindow.getFocusedWindow()
    //广播给 webview.js 中
    win.webContents.send('openWebview',url)
}
{
    label: '链接切换爱奇艺',
    click: function(){
        opentWebView('https://www.iqiyi.com/')
    } 
}

//渲染进程
var {ipcRenderer}= require('electron')
var webview = document.querySelector('#webview')
ipcRenderer.on('openWebview',function(err,data){
    webview.src = data
})

```

## 简易编辑器
- 打开：文本获取内容，用到 （1）主进程向渲染进程发消息（2）弹窗获取路径
（3）fs读取路径  （4）绑定到Dom上
（5）   编辑的时候要夹 星*号， 第一次要弹出保存路径，第二次输入不用弹出保存路径，直接保存，点击新建和打开之前提示是否保存

- 存储：内容， （1）Dom获取，（2）fs写入流（3）通过弹窗指定存储路径
- 

## **设置快捷键**  
```
// accelerator："Ctrl+P", 设置快捷键
{
    label: '打印',
    accelerator:"Ctrl+P",
    click: function(){}
},

//实现打印功能呢
{
    label: '打印',
    accelerator:"Ctrl+P",
    click: function () {
        //打印功能通过 webContents  https://electronjs.org/docs/api/web-contents
        BrowserWindow.getFocusedWindow().webContents.print();
    }
},
```

## **增加代码高亮插件**
CodeMirror
```
下载 npm install codemirror
```  
## **系统托盘 托盘右键菜单 托盘光标闪烁 点击右上角关闭按钮隐藏托盘**
- 开启渲染模式中的 开启控制台 托盘不表不显示  要关闭控制台
```
//通过Tray 模块图标显示在控制台
const {Tray} = require('electron')
var path = require('path')
var iconTray = new Tray(path.join(__dirname,'../static/lover.png'))

// 增加托盘事件
var trayMenu = Menu.buildFromTemplate([
    {
        label:'设置',
        click:function(){
          console.log('setting')
        }
      },
    }
])
iconTray.setContextMenu(trayMenu);

//提示信息
iconTray.setToolTip('electron应用');

//监听任务栏的单双击事件
var win=BrowserWindow.getFocusedWindow(); h获取不到值
下面没法进行

//

```
## **实现消息通知**
```
html 代码
<button id="notice">点击按钮实现通知</button>

js代码
var path =require('path')
var notice = document.querySelector('#notice')
notice.onclick = function(){
    var option ={
        title:'electron 通知api',
        body:'平台软件更新 通知',
        icon:path.join('static/lover3.jpg')
    }
    var myNotification = new window.Notification(option.title,option)
    myNotification.onclick = function(){
        console.log('点击了事件')
    }
}
```
## **听网络变化**
```
window.addEventListener('online',function(){
    console.log('有网络了')
})

window.addEventListener('offline',function(){
    console.log('没有网络')
})
```
## **注册全局快捷键**
```
在 globalShortcart.js中的内容

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

在main里的内容 
在createWindow 外面注册
app.on('ready', createWindow)
// 页面一进来就夹在内容
require('./main/globalShortcart.js')
```
## **剪切板**
渲染进程和主进程都可以应用
```
html代码
<button id="inputBtn">点击复制到文本框</button>
js代码
//剪切板 可以在主进程用页可以在渲染进程用
var {clipboard} =require('electron')
var inputs = document.querySelector('#inputs')
var inputBtn = document.querySelector('#inputBtn')
inputBtn.onclick =function(){
    //获取消息
    clipboard.writeText(code.innerHTML)
    //获取粘贴内容
    inputs.value = clipboard.readText()
}
```

## **剪切复制图片**
```
var imgsBtn = document.querySelector('#imgsBtn');

imgsBtn.onclick =function(){
    var images = nativeImage.createFromPath('./static/lover3.jpg')
 //复制图片
    clipboard.writeImage(images)

    //粘贴图片
    var imgSrc = clipboard.readImage().toDataURL();
    console.log(imgSrc)

    //将图片插入到页面里面
    imgDome = new Image()
    imgDome.src = imgSrc
    document.body.appendChild(imgDome)
}
```
## **electron-vue 下载**
```
下载

npm install -g vue-cli
vue init simulatedgreg/electron-vue my-project

```
