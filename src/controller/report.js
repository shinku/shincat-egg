const Controller = require('../core/controller');
const {v4 : uuid4}  =require('uuid'); 
class Report extends Controller{
    //记录微信小程序报错
    async report(){
        let {
            app ,
            context,
            services
        } = this;
        let {
            msg,
            projectid,
            appversion,
            errormessage,
            line,
            col,
            error
        } = this.request.body;
        
        let {header} = this.request;
       
        let ua = header['user-agent'];

        let ip = header['x-real-ip'];
        let url = header['origin'];
        if(!msg || !projectid || !appversion){
            this.send({
                code:0,
                msg:"params lacked"
            });
            return;
        }
        try{
           
            //先判断project 是否存在
            let res = await services.projects.infoProject(
                projectid
            );
            if(res.length == 0 ){
                this.send({
                    code:0,
                    msg:"该project id 不存在"
                });
                return;
            }
            //return;
            //console.log(services.projectError);
            let sequelize = this.plugins.sequelize.sequelize;
            let transaction = await  sequelize.transaction();

            let msgdata = {
                msg,
                errormessage,
                error
            }
            let errormessageid = uuid4();
            let textfield = services.textfield;
            await textfield.insert({
                pid:errormessageid,
                type:'textError',
                text:JSON.stringify(msgdata),
            })
            await services.projectError.insert({
                projectid,
                errormessageid,
                appversion,
                line,
                col,
                ua,ip,url
            });

            this.send(1);
        }catch(e){
            this.send(e.toString());
        }
      
       
        
    };
    async getReport(){
        let {
            app ,
            context,
            services
        } = this;
        let {projectid,pageNumber,count,search} = this.request.body;
        pageNumber = pageNumber  || 0;
        count = count || 20; 
        if(search){
            //如果存在search 字段，则模糊搜索错误日志
        }
        let totalnum = await services.projectError.table.count(
            {
                where:{
                    projectid
                },
                
            }
        );
        
        let result = await services.projectError.getInfo({
            projectid,pageNumber,count
        });
        let sendresult = 
        result[0].map(item=>{
            //console.log(item)
            let rest = {};
            try{
                
                rest = JSON.parse(item.text);
                console.log({dd})
            }
            catch(e){
               
                var dd = item.text;
                rest = {
                    msg:dd
                }
            }
           
            return {
                projectid:item.projectid,
                appversion:item.appversion,
                url:item.url,
                ua:item.ua, 
                browser:item.browser,
                ip:item.ip,
                line:item.line,
                col:item.col,
                createdAt:item.createdAt,
                ...rest

            }
        })
        this.send({
            code:1,
            data:{
                pagetotal:totalnum,
                list:sendresult
            }
        })
    };
}
module.exports = Report;