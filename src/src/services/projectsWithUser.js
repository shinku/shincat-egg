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
    count ({userid}){
        return this.table.count({
            where:{userid}
        });
    }
    //查看user 和 project 的信息
    withUserInfo({userid,projectid}){
       
        return this.table.findAll({
            where:{
                projectid,
                userid
            }
        })     
    }
    
}
module.exports = ProjectsWithUser;