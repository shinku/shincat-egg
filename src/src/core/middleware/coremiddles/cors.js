let allowList =null;
const getAllowList=(config)=>{
    let {domains} = config; 
    if(allowList) return allowList;
    allowList = {};
    domains.forEach(item=>{
        allowList[item] = 1;
    })
    return allowList;
}
module.exports =(config)=>{
    if(!config){
        return async (ctx,next)=>{
            await next();
        }
    }
    getAllowList(config);
    return async (ctx,next)=>{
        let host = ctx.request.header.referer;
        if(host){
            if(host.lastIndexOf('/')==host.length-1){
                host = host.substr(0,host.length-1);
            }
        }
        if(allowList["*"]){
            host = "*" 
        };
        if(allowList[host]==1){
            ctx.set("Access-Control-Allow-Origin",host);
            ctx.set("Access-Control-Allow-Headers","Content-Type,Cookie,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
            ctx.set("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
           // ctx.set('Access-Control-Allow-Credentials',"true")
        };
        await next();
    }
}