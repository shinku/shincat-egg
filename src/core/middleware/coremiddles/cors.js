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
        //console.log(ctx);
        //cconsole.log(2131231231231);
        await next();
        let host = ctx.request.header.referer;
        if(allowList["*"]){
            host = "*" 
        };
        if(allowList[host]==1){
            ctx.set("Access-Control-Allow-Origin",host);
            ctx.set("Access-Control-Allow-Headers","content-type");
            ctx.set("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
            ctx.set('Access-Control-Allow-Credentials',true)
        };
       
        
       
    }
}