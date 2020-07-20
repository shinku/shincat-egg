const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class ProjectError extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'project_error';
    }
    insert({projectid,msg,appversion},...params){
       
        return this.table.create({
            projectid,msg,appversion
        },...params)
    }
    getInfo({projectid}){
        return this.table.findAll({
            where:{
                projectid
            }
        })
    }
    //登录
  
    
}
module.exports = ProjectError;