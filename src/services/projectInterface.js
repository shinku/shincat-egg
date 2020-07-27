const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class ProjectsInterface extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'interfaces_projects';
    }
    insert({projectid,
        contenttype,
        url,
        response,
        description,interfaceid},...params){
        return this.table.create({
            projectid,
            contenttype,
            url,
            response,
            description,
            interfaceid
        },...params)
    }
    count ({projectid}){
        return this.table.count({
            where:{projectid}
        });
    }
    getList(...params){
        console.log({
            ...params[0]
        })
        return this.table.findAll({
            ...params[0]
        });
    }
    //登录
  
    
}
module.exports = ProjectsInterface;