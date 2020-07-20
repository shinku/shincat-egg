const Controller = require('../core/controller');
class Report extends Controller{
    //记录微信小程序报错
    async reportMini(){
        let {
            app ,
            context,
            services
        } = this;
        let {
            msg,
            projectid,
            appversion
        } = this.request.body;
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
            await services.projectError.insert({
                projectid,
                msg,
                appversion
            });

            this.send(1);
        }catch(e){
            this.send(e.toString());
        }
      
       
        
    };
    async getReportMini(){
        let {
            app ,
            context,
            services
        } = this;
        let {projectid} = this.request.body;
        
        let result = await services.projectError.getInfo({
            projectid
        });
        this.send({
            code:1,
            data:result
        })
    }
}
module.exports = Report;