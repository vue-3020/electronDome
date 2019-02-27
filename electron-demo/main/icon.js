var { BrowserWindow, Tray, Menu, app } = require('electron');

var path = require('path');

//绑定图标
var iconTray = new Tray(path.join(__dirname, '../static/lover.png'));
console.log(iconTray);

//绑定右键菜单
// mac左键菜单
var trayMenu = Menu.buildFromTemplate([

    {

        label: '设置',
        click: function() {

            console.log('setting')
        }
    },
    {

        label: '升级',
        click: function() {

            console.log('update')
        }
    },
    {

        label: '退出',
        click: function() {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        }
    }
]);

iconTray.setContextMenu(trayMenu);

//鼠标划过icon提示功能
iconTray.setToolTip('electron应用');



//实现点击关闭按钮让应用保存在托盘里面 ，双击托盘打开应用
// let win2 = BrowserWindow.getFocusedWindow()
// win2.on('closed', (e) => {
//     if (!win2.isFocused()) {
//         win2 = null;
//     } else {
//         e.preventDefault(); //阻止窗口的关闭事件
//         win2.hide();
//     }
// })

// //监听任务栏图标的点击事件
// iconTray.on('double-click', function() {

//     win.show();
// })





//闪烁图标

var count = 0;

var timer = setInterval(function() {
    count++;

    if (count % 2 == 0) {

        iconTray.setImage(path.join(__dirname, '../static/lover.png'))

    } else {

        iconTray.setImage(path.join(__dirname, '../static/timg.jpg'))
    }

}, 500)