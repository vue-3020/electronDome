// Menu 是主进程模块， 必须的用remote 通讯
var remote = require('electron').remote;

const Menu = remote.Menu;


//定义菜单
var template = [{

            label: '文件',
            submenu: [{
                    label: '新建文件',
                    //创建快捷键
                    accelerator: 'ctrl+n',
                    click: function() {
                        console.log('ctrl+n');
                    }
                },
                {

                    label: '新建窗口',
                    click: function() {

                        console.log('new window');
                    }
                }
            ]
        },
        {

            label: '编辑',
            submenu: [

                {

                    label: '复制11',
                    role: 'copy' // 角色
                },
                {

                    label: '截切',
                    role: 'cut'
                }
            ]
        }


    ]
    // 构建模板
var m = Menu.buildFromTemplate(template);

// 设置应用程序菜单
Menu.setApplicationMenu(m);

// 自定义右键菜单
window.addEventListener('contextmenu', function(e) {
    //阻止当前窗口默认事件
    e.preventDefault();

    //在当前窗口点击右键的时候弹出  定义的菜单模板
    m.popup({
        window: remote.getCurrentWindow()
    })
}, false)