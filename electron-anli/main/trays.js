// 创建右下角托盘

var {Menu,Tray,app,BrowserWindow} = require('electron')

var path = require('path')

var iconTray = new Tray(path.join(__dirname,'../static/lover.png'))


//绑定托盘右键菜单

var trayMenu = Menu.buildFromTemplate([
    {
        label:'设置',
        click:function(){
          console.log('setting')
        }
      },
      {
        label:'升级',
        click:function(){
          console.log('update')
        }
      },
    {
        label:'退出',
        click:function(){
            if (process.platform !== 'darwin') {
                app.quit();
            }
        }
    }
])
iconTray.setContextMenu(trayMenu); 

iconTray.setToolTip('electron应用'); //


//实现点击关闭按钮，让应用保存在托盘里，双击托盘打开应用

//trayWindow 没有值所以是null

var trayWindow = BrowserWindow.getFocusedWindow() 

// trayWindow.on('close',(e)=>{
//     //trayWindow.isFocused() 判断窗口是否在焦点区域
//     if(!trayWindow.isFocused()){
//             trayWindow=null;
//     }else{
//         e.preventDefault();  //阻止窗口的关闭事件
//         trayWindow.hide(); //最小化，隐藏在托盘
//     }  
// })

 //监听任务栏图标的点击事件
iconTray.on('double-click',function(){
    trayWindow.show(); //最大化
})




//图标闪烁
var count =0 ;
var time = setInterval(function(){
    count++
    if(count%2 ==0){
        iconTray.setImage(path.join(__dirname,'../static/lover.png'))
    }else{
        iconTray.setImage(path.join(__dirname,'../static/lover3.jpg'))
    }
},500)

