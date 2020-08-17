module.exports =  (config,app)=>{
    
    return async (ctx,next)=>{
        //console.log('565656565');
        //console.log(ctx.plugins);
        let {controllers}  = app;
        //console.log({
        //    controllers
        //})z
        let {proxy} = controllers;
        proxy.context = ctx;
        //console.log( proxy.context);
        await proxy.apiUse.call(proxy,ctx);
        await next();
    }
}