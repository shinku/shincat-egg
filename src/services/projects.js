const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class Projects extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'projects';
    }
    //登录
    addProject({projectid,projectname},...params){
        //
       
        return this.table.create({
            projectid,
            projectname,
        },...params);

    }
    //查看项目信息
    infoProject(projectid){
        return this.table.findAll({
            where:{
                projectid
            }
        })
    }

    
}
module.exports = Projects;