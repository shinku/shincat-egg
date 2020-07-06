let path = require('path');
let fs = require('fs');
module.exports =(app)=>{
    //在插件目录下读取所有的插件文件
    let list = fs.readdirSync(path.join(process.getRoot(),'plugins'));
    //
    //applications 存储 application 插件的引用
    const applications = [];
    //context 存储 context 插件的引用
    const context =[]
    list.forEach(_item=>{
        let plugin = require(path.join(process.getRoot(),'plugins',_item));
        //默认plugin 以文件名的形式挂载在application 下面
        let pluginname = _item.substr(0,_item.indexOf('.'))
        
        app.plugins[pluginname] = plugin;
        applications.push({
            name:pluginname,
            content:plugin
        })
        //如果存在install 方法，则在插件挂载的时候调用install 方法/
        //常规情况下插件的引用不存在安装调用的问题，一般install无需增加
        if(plugin['install']){
            plugin['install'].call(plugin,app);
        }
        //如果存在 context 配置，则将context 下的内容挂载在context下
        if(plugin["context"]){
            context.push({
                name:pluginname,
                content:plugin["context"]
            })
        }

    });
    return {applications,context}
}