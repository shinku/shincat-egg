const Controller = require('../core/controller');
const {v4 : uuid4}  =require('uuid'); 

class Projects extends Controller{
    //寻找项目
    async findProject(){
        const {
            projectid
        } = this.request.body;
        let service  = this.services.projects;
        let result = await service.infoProject(projectid);
        this.send(result);
    }
    async list (){
        const userid = this.context.cookies.get('userid_remote');
        let {
            pagenumber,
            count
        } = this.request.body;
        pagenumber = pagenumber || 0;
        count = count || 20;
        let project_users = this.services.projectsWithUser;
        let allcount =await project_users.count({userid});
        let sql = `
        select projects.projectid,projects.projectname,projects.projecttype,projects.projectdesc from projects,projects_users
        where projects.projectid = projects_users.projectid
        and projects_users.userid = '${userid}'
        limit ${pagenumber*count},${count}
        `;
        let result = await project_users.table.query(sql);
        
        this.send({
            code:1,
            data:{
                list:result[0],
                allcount
            }
        })

    }
    async typelist(){
        
    }
    async getmocklist(){
        const userid = this.context.cookies.get('userid_remote');
        let {
            pagenumber,
            count,
            projectid
        } = this.request.body;
        pagenumber = pagenumber || 0;
        count = count || 20;
       
        let interfaces_project = this.services.projectInterface;
        let result = await interfaces_project.getList({
            where:{projectid},
            offset:pagenumber*count,
            limit:count
        });
        this.send({
            code:1,
            data:result
        })
    }
    async getmockdetails(){
        const userid = this.context.cookies.get('userid_remote');
        let {
            interfaceid,
        } = this.request.body;
        console.log( this.request.body);
        let result = await this.services.paramInterface.getDetails({
            interfaceid
        });
        this.send({
            code:1,
            data:result
        })
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
            description
        } = mockdata;

        //生成接口ID
        let interfaceid = uuid4();
        let sequelize = this.plugins.sequelize.sequelize;
        let transaction = await  sequelize.transaction();
        
        try{
            //add interface id
           
            params.forEach(async (item)=>{
                let {name,type,desc} = item;
                await this.services.paramInterface.insert({
                    interfaceid,
                    name,
                    type,desc
                }, {transaction})
            })
            await this.services.projectInterface.insert(
                {projectid,
                    contenttype,
                    url,
                    response,
                    description,
                    interfaceid},
                {transaction}
            );
            await transaction.commit();
            this.send({
                code:1,
                msg:"done",
                data:interfaceid
            })
            
            


        }catch(e){
            await transaction.rollback();
            this.send({
                code:0,
                msg:e.toString(),
                data:''
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
            await this.services.projects.addProject({projectid,projectname,projecttype,projectdesc},{transaction});
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