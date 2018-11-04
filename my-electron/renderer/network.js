//监听网络变化是否有网

window.addEventListener('online',function(){
    console.log('有网络了')
})

window.addEventListener('offline',function(){
    console.log('没有网络')
})