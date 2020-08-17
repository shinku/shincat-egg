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
        responseid,
        responseexplainid,
        method,
        descriptionid,interfaceid,},...params){
        return this.table.create({
            projectid,
            contenttype,
            url,
            responseid,
            responseexplainid,
            method,
            descriptionid,
            interfaceid
        },...params)
    }
    update({
        contenttype,
        url,
        //responseid,
        //responseexplainid,
        method,
        //descriptionid,
        interfaceid},...params){
            /*return this.table.update(tabledata,{where:{
                interfaceid:interfaceid
            }},...params)*/
            let sql = `
            UPDATE interfaces_projects SET contenttype='${contenttype}',url='${url}',
            method='${method}',updatedAt=NOW() WHERE interfaceid = '${interfaceid}' and isdel = 0`;
          
            return this.table.query(sql,...params);

    }
    info({projectid}){
        return this.table.find({
            where:{
                projectid,
                isdel:0
            }
        });
    }
    count ({projectid}){
        return this.table.count({
            where:{projectid,
                isdel:0}
        });
    }
    getList(...params){
        return this.table.findAll({
            ...params[0]
        },{
            where:{
                isdel:0
            }
        });
    }
    //登录
  
    
}
module.exports = ProjectsInterface;