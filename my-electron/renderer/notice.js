//底部消息通知栏

var path =require('path')
var notice = document.querySelector('#notice')
notice.onclick = function(){
    var option ={
        title:'electron 通知api',
        body:'平台软件更新 通知',
        icon:path.join('static/lover3.jpg')
    }
    var myNotification = new window.Notification(option.title,option)
    myNotification.onclick = function(){
        console.log('点击了事件')
    }
}

window.addEventListener('online',function(){
    var option2 ={
        title:'来网络了',
        body:'真的有网络了',
    }
    var myNotification = new window.Notification(option2.title,option2)
})
//检查是否断网
window.addEventListener('offline',function(){
    var option2 ={
        title:'网络异常',
        body:'网络异常 ！请检查你的网络',
        icon:path.join('static/lover3.jpg')
    }
    var myNotification = new window.Notification(option2.title,option2)
})