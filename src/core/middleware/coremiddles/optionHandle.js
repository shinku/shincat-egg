module.exports =  async (ctx,next) =>{
    //let str ="".toLocaleLowerCase
    if(ctx.method.toLocaleLowerCase()=="options"){
        ctx.status = 200;
    }
    await next();
}