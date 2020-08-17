const checkLogIn = async (ctx,next)=>{
    let userid = ctx.cookies.get('userid_remote');
    
    //console.log(`userid = ${userid}`);
    if(!userid)  {
        //console.log(12312312312);
        //console.log(ctx.plugins);
        ctx.plugins.sendresult({
            code:-1,
            data:null,
            msg:"nologin"
        });
        return;
    }else{
        ctx.userid = userid;
        await next();
    }   
    
}
module.exports = (router,app)=>{
    //console.log(router,app)
    let {
        index,
        user,
        projects,
        report,
        proxy
    } = app.controllers;

    const vpath = "";
    router.get(vpath+'/test',async (ctx)=>
        ctx.body = "hellotest"
    );
    router.get('/',async (ctx)=>{
        ctx.body = "hi mock,from router"
    })
    router.post(vpath+"/pm/login",user.login);
    router.post(vpath+"/pm/getuserinfo",checkLogIn,user.getuserinfo);
    
    router.post(vpath+"/pm/logout",user.logout);
    router.post(vpath+"/pm/projectlist",checkLogIn,projects.list);
    router.post(vpath+"/pm/projecttypelist",checkLogIn,projects.typelist);
    router.post(vpath+"/pm/addaccount",checkLogIn,user.addaccount);
    router.post(vpath+"/pm/projectinfo",checkLogIn,projects.findProject);

    router.post(vpath+"/pm/addproject",checkLogIn,projects.addProject);
    router.post(vpath+"/pm/getmocklist",checkLogIn,projects.getmocklist);
    router.post(vpath+"/pm/getmockdetails",checkLogIn,projects.getmockdetails);
    router.post(vpath+"/pm/updateinterface",checkLogIn,projects.updateinterface);
    router.post(vpath+"/pm/addmock",checkLogIn,projects.addmock);
    router.post(vpath+"/pm/removemock",checkLogIn,projects.removemock);
    //删除用户
    router.post(vpath+"/pm/removeaccount",checkLogIn,user.removeAccount);
    //上传报错
    router.post(vpath+"/report/error/set",report.report);
    //获取报错信息
    router.post(vpath+"/report/error/get",report.getReport);

    router.get(vpath+"/api/:linklink",proxy.apiUse);
    router.post(vpath+"/api/:linklink",proxy.apiUse);
    
    //


   //router.get(vpath+"/report/addreport")
    /*router.get(vpath+'/test',index.start);
    router.get(vpath+'/soproxy/test',index.start);
    router.post(vpath+'/upload',index.upload);
    router.get(vpath+'/file/:filename',index.getFile);
    router.get(vpath+'/filefrommembery/:number',index.getFileFromMembery)
    router.post(vpath+'/uploadjddee',index.uploadJddee);
    router.get(vpath+'/getsocketnumber',index.getSocketNumbers);*/
    //获取所有的mock 项目
    //增加mock项目
    //编辑mock项目，api 描述，添加 字段以及返回模版
    //用户认证
    //mockapi托管
    // api/{MOCKID}/{router}/
    
}
