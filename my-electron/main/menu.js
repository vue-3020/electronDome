//创建菜单

/*
var electron = require('electron')
var Menu = electron.Menu

// 上面的内容 es6 一行搞定
const {Menu} = require('electron')
*/
const { Menu} = require('electron')

//(1)定义菜单
var template = [{
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
var  m = Menu.buildFromTemplate(template);
//(3)调用
Menu.setApplicationMenu(m)