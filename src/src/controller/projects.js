const Controller = require('../core/controller');
const {v4 : uuid4}  =require('uuid'); 

class Projects extends Controller{
    //寻找项目
    async list (){
        const userid = this.context.cookies.get('userid_remote');
        let {
            pagenumber,
            count
        } = this.request.body;
        pagenumber = pagenumber || 0;
        count = count || 100;
        let project_users = this.services.projectsWithUser;
        let allcount =await project_users.count({userid});
        let sql = `
        select t1.* ,textfields.text as projectdesc from (select projects.projectid as projectid,projects.projectname,projects.projecttype,projects.projectdescid
            from projects,projects_users
            where projects.projectid = projects_users.projectid
            and projects_users.userid = "${userid}" ) as t1 left join
           textfields on textfields.pid = t1.projectdescid
        limit ${pagenumber*count},${count}
        `;
        let result = await project_users.table.query(sql);
        let responseResult = result[0];
        this.send({
            code:1,
            data:{
                list:responseResult,
                allcount
            }
        })

    }
    async findProject(){
        let {
            projectid
        } = this.request.body;
        let sql = `
        select t1.* ,textfields.text as projectdesc from (select projects.projectid as projectid,projects.projectname,projects.projecttype,projects.projectdescid
            from projects,projects_users
            where projects.projectid = projects_users.projectid
            and projects_users.projectid = "${projectid}" ) as t1 left join
           textfields on textfields.pid = t1.projectdescid`;
        let projects = this.services.projects;
        try{
            let result = await projects.table.query(sql);
            let responseResult = result[0];
            this.send({
                code:1,
                data:{
                    list:responseResult,
                }
            })
        }catch(e){
            this.send({
                code:0,
                data:{
                  error:e.toString()
                }
            })
        }
        
    }
    async typelist(){
        
    }
    async getmocklist(){
        const userid = this.context.cookies.get('userid_remote');
        const idlist =[];
        let {
            pagenumber,
            count,
            projectid
        } = this.request.body;
        pagenumber = pagenumber || 0;
        count = count || 100;
        let interfaces_project = this.services.projectInterface;
        /*let result = await interfaces_project.getList({
            where:{projectid},
            offset:pagenumber*count,
            limit:count
        });*/
        let result = await interfaces_project.table.query(
            `
            select 
            interfaces_projects.projectid, interfaces_projects.interfaceid,textfields.text
            from interfaces_projects
            LEFT JOIN textfields
            on
            textfields.pid = interfaces_projects.interfaceid
            where interfaces_projects.projectid = '${projectid}'
            and interfaces_projects.isdel = 0
            `
        )
        //console.log(result[0]);
        let data = result[0].map(item=>{
            var text = JSON.parse(item.text) || {};;
            item.text="";
            return Object.assign(item,text)
        })
        this.send({
            code:1,
            data
        })
    }
    async getmockdetails(){
        const userid = this.context.cookies.get('userid_remote');
        let {
            interfaceid,
        } = this.request.body;
      
        let result = await this.services.paramInterface.getDetails({
            interfaceid
        });
        this.send({
            code:1,
            data:result
        })
    }
    async removemock(){
        let {userid} = this.context;
        let {interfaceid} = this.request.body;
        try{
            await this.services.projectInterface.remove({interfaceid});
            this.send({
                code:1,
                msg:"done",
                data:""
            })
        }
        catch(e){
            this.send({
                code:0,
                msg:e.toString(),
                data:""
            })
        }

    }
    async addmock(){
        let {request,context} = this;
        let requestbudy = request.body;
        let {mockdata,projectid} = requestbudy;
        let {params} = mockdata;
        let {
            contenttype,
            url,
            response,
            responseexplain,
            description,method
        } = mockdata;

        //生成接口ID
        let interfaceid = uuid4();
        let sequelize = this.plugins.sequelize.sequelize;
        let transaction = await  sequelize.transaction();
        let textfield = this.services.textfield;
        try{
            let responseexplainid = "";
            let descriptionid = "";
            let responseid = "";
            await this.services.projectInterface.insert({
                projectid,
                contenttype,
                url,
                method,responseexplainid,descriptionid,responseid,interfaceid
                //response,
            },{transaction})
            await textfield.insert({
                pid:interfaceid,
                text:JSON.stringify(mockdata),
                type:"interfacedesc"
            },{transaction});
            await transaction.commit();
            this.send({
                code:1,
                msg:"done",
                data:interfaceid
            })
        }   
        catch(e){
            await transaction.rollback();
            this.send({
                code:1,
                msg:"done",
                data:e.toString()
            })
        }
    }
    async updateProject(){
        const userid = this.context.cookies.get('userid_remote');
        const {
            projectname,
            projecttype,
            projectdesc
        } = this.request.body;

    }
    async updateinterface(){
        let {request,context} = this;
        let requestbody = request.body;
        let {mockdata,projectid} = requestbody;

        let {params} = mockdata;
        let {
            contenttype,
            url,
            response,
            description,
            method,responseexplain,
            interfaceid
        } = mockdata;
        /*this.send({
            code:1,
            msg:"done",
            data:JSON.stringify(mockdata)
        })
        return;*/
        let sequelize = this.plugins.sequelize.sequelize;
        let {userid} = context;
        let usergetproject = await this.services.projectsWithUser.withUserInfo(
            {userid,
            projectid}
        );
        
        if(usergetproject.length ==0){
            this.send({
                code:2,
                msg:"no lisence",
                data:projectid
            })
            return;
        }

        let transaction = await  sequelize.transaction();
      
        let textfield = this.services.textfield;
        let interfaces_projects = this.services.projectInterface;
        try{
            await textfield.update({
                pid:interfaceid,
                text:JSON.stringify(mockdata),
                type:"interfacedesc"
            },{transaction});
            await interfaces_projects.update({
                contenttype,
                url,
                method,
                interfaceid
            },{transaction})
            this.send({
                code:1,
                msg:"done",
                data:interfaceid
            });
            await transaction.commit();
        }   
        catch(e){
            await transaction.rollback();
            this.send({
                code:1,
                msg:"done",
                data:e.toString()
            })
        }
      
    

    }
    async addProject(){
        const userid = this.context.cookies.get('userid_remote');
        const {
            projectname,
            projecttype,
            projectdesc
        } = this.request.body;
        let projectid = uuid4();
        //获取sequelize 初始化的实例
        let sequelize = this.app.plugins.sequelize.sequelize;
        // 获取project_users 的serveice 对象
        let project_users = this.services.projectsWithUser;
         //开启事务
        let transaction = await  sequelize.transaction();
        try{
            //projects表中插入projectname;
            //对于项目描述，先生成projectdescid用于项目描述外键
            const projectdescid = uuid4()
            await this.services.projects.addProject({projectid,projectname,projecttype,projectdescid},{transaction});
            //add text in table of textfield;
            await this.services.textfield.insert(
                {
                    text:projectdesc,
                    pid:projectdescid,
                    type:'projectdesc'
                },{transaction})
            //往projects_users 表中插入数据
            await project_users.insert({projectid,userid},{transaction});
            //提交事务
            await transaction.commit();
            this.send({
                code:1,
                msg:'done',
                data:{}
            });

        }catch(e){
            //报错，事务回滚
            await transaction.rollback();
            this.send(e.toString());

        }
        //this.send('addpriject')
    }
}
module.exports = Projects;