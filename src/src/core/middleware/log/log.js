module.exports = (config, application)=>{
    return async (ctx,next)=>{
        
        await next();
    }
}