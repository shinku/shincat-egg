const path = require('path');
const fs = require('fs');
const { setEnv,getEnv } = require('../env/index');
const controller = require('./controller');
const {getController} = require('./corecontroller');
const pluginInit = require('./coreplugins')
const KOA = require('koa');
const server = new KOA();
//const initRouter = require('../middleware/main');
const loadMiddleware = require('./coremiddleware');
class application {
    constructor(){
        this.plugins={}
        this.server = new KOA();
        this.middles = [];
        //首先获取配置文件
        this.loadConfig();
        //加载controllers
        this.controllers = getController(this);
        //
        //获取插件
        let {context,applications} = pluginInit(this);
        //加载中间件
        let middlewares = loadMiddleware(this);
       
        this.io = null;
        let commands = process.argv.slice(2);
        for(var val of commands){
            if(val == "--dev"){
                setEnv(val);
            }
        }
        process.env.NODE_ENV = getEnv();
       
        //获取controller
       
        //console.log(this.controllers);
        this.server.listen(this.config.port, () => {
            console.log(`app run at : http://127.0.0.1:${this.config.port}`);
        });
        // 
       
        
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
        //console.log(this.plugins);
        //console.log(this.plugins.sequelize.DB);
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