
//引入模块 属于渲染进程，页属于住进程
var {shell} =require('electron')

var aDom = document.querySelector('#aDom')

//sheel 打开外部浏览器

aDom.onclick = function(e){
    //阻止默认行为,不在当前文件打开
    e.preventDefault()
    //shell 模块打开 外部浏览器
    var href = this.getAttribute('href')
    shell.openExternal(href)
}
