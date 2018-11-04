var {ipcRenderer} =require('electron');

var xuanRanBtn = document.querySelector('#xuanRan')

xuanRanBtn.onclick = function(){
    //通过ipcRenderer 穿参数
   var aid = '通过ipcRenderer 穿参数 11111111'
   ipcRenderer.send('openWindow',aid) 

   //通过localStorage 存储
var count = '通过localStorage，传递到渲进程，在弹窗打开'
   localStorage.setItem('aid',count)

}

//接收 子弹窗传过来的数据
var box3= document.querySelector('#box3')
ipcRenderer.on('toIndex',function(event,data){
    box3.innerHTML =data
    console.log(data)
})