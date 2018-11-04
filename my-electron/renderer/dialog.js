//主进程模块，写到了渲染进程。目的是好管理

var {remote} = require('electron')

var dialogError= document.querySelector('#dialogDialog')
var mesageDialog= document.querySelector('#mesageDialog')
var openDialog= document.querySelector('#openDialog')
var saveDialog= document.querySelector('#saveDialog')

// 警告弹出框
dialogError.onclick = function(){
    remote.dialog.showErrorBox('警告','操作有误')
}
//
mesageDialog.onclick = function(){
    remote.dialog.showMessageBox({
        type:'info', //样式 类型 "none", "info", "error", "question" warning
        title:'提示信息',
        message:'这是内容',
        buttons:['确定','取消','哈哈']
    },function(index){
        //返回的是索引值
        console.log(index)
    })
}

//打开文件或者文件夹
openDialog.onclick = function(){
    remote.dialog.showOpenDialog({
        // openFile 打开文件
        // openDirectory 打开文件夹
        // multiSelections-允许多选。
        previewFile:['openFile', 'openDirectory', 'multiSelections']
    },function(data){
        console.log(data) //文件路径
    })
}

//另存为功能
saveDialog.onclick = function(){
    remote.dialog.showSaveDialog({
        title:'另存为功能',
        // defaultPath:'/Users/wuxinkai/Documents/electronDome/my-electron', //默认路径
        filters: [ //保存类型
            {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
            {name: 'Custom File Type', extensions: ['as']},
            {name: 'All Files', extensions: ['*']}
          ]
    },function(path){
        console.log(path) //保存以后会打印路径，但是不会真的保存， 具体保存的用js
    })
}