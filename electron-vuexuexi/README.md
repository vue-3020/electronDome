# my-electron-vue

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit tests
npm test


```

---
## **sass的应用**
```
"node-loader": "^0.6.0",
"node-sass": "^4.10.0",
引入
npm install sass-loader node-sass webpack --save-dev

//webpack.main.config 页面配置
{
test: /\.scss$/,
use: [
    "style-loader",
    "css-loader",
    "sass-loader"
]
},

// css中配置 lang="scss"
<style lang="scss">
    .a{
        .b{
            width: 100px
        }
    }
</style>
```
## **隐藏顶部菜单**
```
    mainWindow.setMenu(null)
```
## **主进程 去掉最大化 最小化 关闭 和顶部导航**
```
frame: false
```

## **自定义拖拽**
```

```

### **安装nedb数据库**
```
1 安装 nedb数据库
cnpm install nedb --save

2 新建一个src/renderer/datastore.js
import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), 'db/device.db')
})

```
   
