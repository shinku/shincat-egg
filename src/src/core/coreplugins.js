let path = require('path');
let fs = require('fs');

const loadplugin = (app,_path)=>{
    let list = fs.readdirSync(path.join(process.getRoot(),_path));
    //applications 存储 application 插件的引用
    const applications = [];
    //context 存储 context 插件的引用
    const context =[]
    list.forEach(_item=>{
        let plugin = require(path.join(process.getRoot(),_path,_item));
        //默认plugin 以文件名的形式挂载在application 下面
        let pluginname = _item.substr(0,_item.indexOf('.'))
        app.plugins[pluginname] = plugin;
        applications.push({
            name:pluginname,
            content:plugin
        })
        //如果存在install 方法，则在插件挂载的时候调用install 方法/
        if(pluginname == "sequelize"){
          
        }
        if(plugin['install']){
            plugin['install'].call(null,app);
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
module.exports =(app)=>{
    let {server} = app;
    let corePlugins =  loadplugin(app,'core/plugins');
    let morePlugins = loadplugin(app,'plugins');
    const applications = [...corePlugins.applications,...morePlugins.applications];
    //context 存储 context 插件的引用
    const context = [...corePlugins.context,...morePlugins.context];
    //let {applications,context}  = loadplugin(app,'plugins');
    //console.log('core plugins installing');
    server.use(async (ctx,next)=>{
        ////此处增加ctx 的插件挂载s
        console.log('挂载context 插件')
        ctx.plugins = {"v":"1.0.0"}
        context.forEach((_item)=>{
                let {name,content}  = _item;
                ctx.plugins[name]  = (...params)=>{content.call(ctx,...params)};
        });
        await next();
    })
   
    return {applications,context}
}