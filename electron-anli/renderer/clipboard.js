//剪切板 可以在主进程用页可以在渲染进程用
var {clipboard,nativeImage} =require('electron')
// 执行 复制操作


var code = document.querySelector('#code')
var inputs = document.querySelector('#inputs')
var inputBtn = document.querySelector('#inputBtn')

code.onclick =function(){
    clipboard.writeText(code.innerHTML)
    alert('复制成功')
}
inputBtn.onclick =function(){
    //获取消息
    clipboard.writeText(code.innerHTML)
    //获取粘贴内容
    inputs.value = clipboard.readText()
}



//复制图片显示到页面 监听按钮复制事件
var imgsBtn = document.querySelector('#imgsBtn');

imgsBtn.onclick =function(){
    var images = nativeImage.createFromPath('./static/lover3.jpg')
 //f复制图片
    clipboard.writeImage(images)

    //粘贴图片
    var imgSrc = clipboard.readImage().toDataURL();
    console.log(imgSrc)

    //将图片插入到页面里面
    imgDome = new Image()
    imgDome.src = imgSrc
    document.body.appendChild(imgDome)
}

