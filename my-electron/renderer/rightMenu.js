//创建菜单
var remote = require('electron').remote

const Menu = remote.Menu

//右键菜单
var template2 = [{
        label: '文件',
        submenu: [{
            label: '编辑'
        }]
    },
    {
        label: '资源',
        submenu: [{
                label: '贴吧',
                click:function(){
                    console.log('增加点击事件')
                }
            },
            {
                label: '地图',
                accelerator:'ctrl+n' //快捷键
            },
        ]
    },
    {
        label: '复制',
        role:'copy' //复制
    },
    {
        label: '剪切',
        role:'cut' //剪切
    }
]
//(2)
var  m2 = Menu.buildFromTemplate(template2);
//调用
Menu.setApplicationMenu(m2)

//右键菜单contextmenu
window.addEventListener('contextmenu',function(e){
    //阻止默认行为
    e.preventDefault()
    //弹出定义的菜单模版
    m2.popup({window:remote.getCurrentWindow()})

},false)//false 表示冒泡， true表示捕获