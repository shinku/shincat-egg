const path = require('path');
const fs = require('fs');
const { setEnv,getEnv } = require('../env/index');
const controller = require('./controller');
const {getController} = require('./utils');
const pluginInit = require('./coreplugins')
const KOA = require('koa');
const server = new KOA();
const initRouter = require('../middleware/main');

class application {
    constructor(){
        this.plugins={}
        this.server = new KOA();
        let {context,applications} = pluginInit(this);
        this.server.use(async (ctx,next)=>{
            //此处增加ctx 的插件挂载s
            ctx.plugins = {"v":"1.0.0"}
            context.forEach((_item)=>{
                let {name,content}  = _item;
                console.log({
                    _item
                });
                ctx.plugins[name]  = (...params)=>{content.call(ctx,...params)};
            });
            await next();
        })
        this.io = null;
        let commands = process.argv.slice(2);
        for(var val of commands){
            if(val == "--dev"){
                setEnv(val);
            }
        }
        process.env.NODE_ENV = getEnv();
        this.loadConfig();
        //获取controller
        this.controllers = getController();
        this.server.listen(this.config.port, () => {
            console.log(`app run at : http://127.0.0.1:${this.config.port}`);
        });
        // 
       
        //初始化路由
        initRouter(this);
        //初始化插件
         //加载plugins
       
       
        console.log('START APP');
        //app/start 是用来增加socket 应用而存在的，可以在app/statrt中增加 脚本，使整个项目和socket 应用整合。
        // PS：socket 应用需要增加单独的端口监听，不能和http 公用一个端口。端口的配置可以在config 中自定义的作出配置
        let appfunsPath = path.join(process.getRoot(),'app/start');
        if(fs.existsSync(appfunsPath))
        {
            let list = fs.readdirSync(appfunsPath);
            list.forEach(_item=>{
                let fun = require(path.join(appfunsPath,_item));
                this.setInit(fun);
            });
        }
       
       
    }
    loadConfig(){
        let env = process.env.NODE_ENV;
        let config = require('../config/config.'+env+".js");
        this.config = config;
    }
    setInit(func){
        console.log({func});
        func.call(null,this);
    }

}
let app = new application();
module.exports = app;