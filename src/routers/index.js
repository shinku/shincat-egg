module.exports = (router,app)=>{
    //console.log(router,app)
    let {
        index,
        user,
        projects,
        report
    } = app.controllers;
    const vpath = "";
    router.get(vpath+'/test',index.start);
    router.post(vpath+"/pm/login",user.login);
    router.post(vpath+"/pm/logout",user.logout);
    router.post(vpath+"/pm/projectlist",projects.list);
    router.post(vpath+"/pm/projecttypelist",projects.typelist);
    router.post(vpath+"/pm/addaccount",user.addaccount);
    router.post(vpath+"/pm/projectinfo",projects.findProject);

    router.post(vpath+"/pm/addproject",projects.addProject);
    router.post(vpath+"/pm/getmocklist",projects.getmocklist);
    router.post(vpath+"/pm/getmockdetails",projects.getmockdetails)
    router.post(vpath+"/pm/addmock",projects.addmock)
    router.post(vpath+"/report/errormini",report.reportMini);
    router.post(vpath+"/report/errormini/get",report.getReportMini);
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
