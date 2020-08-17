module.exports =  (config,app)=>{
    
    return async (ctx,next)=>{
        //console.log("api proxy");
        console.log("PROXY",JSON.stringify(ctx.request.headers))
        let {controllers}  = app;
        let {proxy} = controllers;
        proxy.context = ctx;
        await proxy.apiUse.call(proxy,ctx);
        await next();
    }
}