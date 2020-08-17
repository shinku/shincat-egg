const static = require('koa-static');
const path = require('path');
module.exports  = (config)=>{
    let {root,option} = config;
    root = root || path.resolve(process.cwd(),"./src/static");
    option = option || {};
    
    return static(root,option)
}