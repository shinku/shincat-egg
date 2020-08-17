let checkTimeOut = (ctx,time)=>{
    let timeout = null;
    let promise =  new Promise((ros,rej)=>{
        timeout = setTimeout(()=>{
            console.log('connection timeout');
            ctx.status = 404;
            ros();
        },time)
    });
    return {
        timeout,
        promise
    }
    
}
module.exports = (configtimeout)=>{
   
    return async (ctx,next)=>{
        let isover = false;
        let time  = new Date();
        setTimeout(()=>{
           
            if(!isover){
                ctx.body = "end";
                ctx.status = 404;
            }
        },configtimeout || 100)
        try{
            await next();
            let ntime = new Date();
            console.log(`request ${ctx.path} cost time:${(ntime-time)}`);
            isover = true;
        }
        catch(e){
            let ntime = new Date();
            console.log(`request ${ctx.path} cost time:${(ntime-time)}`);
            console.log("Error,",e.toString());
        }
        

    }
}