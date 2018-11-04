var {ipcRenderer,remote}=require('electron');
var fs=require('fs');


//获取文本框dom

var textAreaDom=document.querySelector("#textArea");




document.addEventListener('contextmenu',function(e){

    e.preventDefault();


    ipcRenderer.send('contextMenu');
})


//监听主进程的操作

ipcRenderer.on('action',function(event,action){

    console.log(action);

    switch(action){

        case "open":
            //通过dialog打开文件
            remote.dialog.showOpenDialog({

                properties:['openFile']

            },function(dir){          
                
                    if(dir){

                        var fsData=fs.readFileSync(dir[0]);

                            //获取文件里面的东西
                        textAreaDom.value=fsData;

                    }
            })
            break;

        case "save":

            remote.dialog.showSaveDialog({

                defaultPath:'aaa.txt',
                filters: [
                
                    {name: 'All Files', extensions: ['*']}
                ]

            },function(dir){
                console.log(textAreaDom.value);

                fs.writeFile(dir,textAreaDom.value,function(err){

                    if(!err){

                        console.log('成功');
                    }
                });
            })
            
            break;


    }

})