//渲染进程，
var fs= require('fs')
window.onload =function(){
  var btn = this.document.querySelector('#btn')
  var textarea = this.document.querySelector('#textarea')
  var content = this.document.querySelector('#content')

  //点击事件
  btn.onclick = function(){
    //获取本地文件 赋值给 textarea
    fs.readFile('package.json','utf8',(err,data)=>{
      textarea.innerHTML = data
    })
  }

  //拖拽事件
  content.ondragenter = content.ondragover = content.ondragleave = function(){
    return false //组织默认行为
  }
  content.ondrop =function(e){
    e.preventDefault();
    var path = e.dataTransfer.files[0].path
    console.log(path)

    fs.readFile(path,'utf-8',(err,data)=>{
     if(err){
      console.log(err)
      return false
     }
     content.innerHTML =data
    })
  }
}