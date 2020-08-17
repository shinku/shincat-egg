const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class Projects extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'projects';
    }
    //addProject
    addProject(values,...params){
        //
       
        return this.table.create({
           ...values
        },...params);

    }
    
    updateProject(values,...params){
        //
       
        return this.table.update({
           ...values
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