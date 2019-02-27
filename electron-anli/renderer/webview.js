var {ipcRenderer}= require('electron')

var webview = document.querySelector('#webview')
ipcRenderer.on('openWebview',function(err,data){
    webview.src = data
})