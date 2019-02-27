import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';

export default new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/data.db')  //指定数据库文件路径

    // 路径参考https://www.w3cschool.cn/electronmanual/electronmanual-electronapp.html
})