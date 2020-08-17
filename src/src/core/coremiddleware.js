const path = require('path');
const fs = require('fs');

const loadMiddleWare = (_path)=>{
    let list = fs.readdirSync(path.join(process.getRoot(),_path));
    return list.map(_item=>{
        let filepath = path.join(process.getRoot(),_path,_item);
        let stat = fs.statSync(filepath);
        if(stat.isFile()){
            let middleware = require(path.join(process.getRoot(),_path,_item));
            //默认plugin 以文件名的形式挂载在application 下面
            let middlewarename = _item.substr(0,_item.indexOf('.'))
            return {
                name:middlewarename,
                middleware:middleware
            };
        }
    });
    
}
module.exports = (application)=>{
    //核心中间件的目录
    let coremiddlewares = loadMiddleWare('core/middleware');
    //项目中间件目录
    let projecrMiddleWare = loadMiddleWare('middleware');
    let {server,config} = application;
    //let {config} = application;
    //加载业务中间件
    //let config = application.config;
    let {middlewares} = config;
    let poollist = {}; 
    projecrMiddleWare.forEach(_item=>{
        if(_item && _item.middleware)
        {
            let {
                name,
                middleware
            } = _item;
            /*let middleConfig =  config[name];
            //return;
            server.use(middleware.call(null,middleConfig,application))*/
            if(name){
                poollist[name] = middleware;
            }
        }
        //return;
    });
    middlewares.forEach(name=>{
        console.log('load middleware',name)
        if(poollist[name]){
            let middleConfig =  config[name];
            server.use(poollist[name].call(null,middleConfig,application))
        }
    })
    coremiddlewares.forEach(_item=>{
        //console.log({_item});
       if(_item && _item.middleware){
            _item.middleware.call(null,application);
       }
    });
    return {
        coremiddlewares,
        projecrMiddleWare
    }
}