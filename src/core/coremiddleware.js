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
            return middleware;
        }
    });
    
}
module.exports = (application)=>{
    //核心中间件的目录
    let coremiddlewares = loadMiddleWare('core/middleware');
    //项目中间件目录
    let projecrMiddleWare = loadMiddleWare('middleware');
    let {server} = application;
    projecrMiddleWare.forEach(_item=>{
        
        server.use(_item)
    })
    coremiddlewares.forEach(_item=>{
        //console.log({_item});
        if(_item) _item.call(null,application);
    });
    
   
   
    return {
        coremiddlewares,
        projecrMiddleWare
    }
}