//头部菜单

/*
var electron = require('electron')
var Menu = electron.Menu

// 上面的内容 es6 一行搞定
const {Menu} = require('electron')
*/
const {Menu} = require('electron');
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
    submenu: [
      {
        label: '复制',
        role: 'copy'
      },
      {
        label: '截切',
        role: 'cut'
      }
    ]
  }
]

var m = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(m);