//并且可以通过 remote 模块给渲染进程调用 

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