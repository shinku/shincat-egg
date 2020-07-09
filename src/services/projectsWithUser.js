const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class ProjectsWithUser extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'projects_users';
    }
    insert({userid,projectid},...params){
        return this.table.create({
            userid,projectid
        },...params)
    }
    //登录
  
    
}
module.exports = ProjectsWithUser;