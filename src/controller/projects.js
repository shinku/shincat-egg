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
    
    async addProject(){
        
        const {
            projectname,
            userid,
            projecttype,
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
            await this.services.projects.addProject({projectid,projectname},{transaction});
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