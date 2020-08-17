const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class ProjectError extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'project_error';
    }
    insert(infos,...params){
       
        return this.table.create({
            ...infos
        },...params)
    }
    getInfo({projectid,pageNumber,count}){
        /*return this.table.findAll({
        
            where:{
                projectid
            },
            include:[
                {
                    model:this.app.services.textfields,
                    where:{
                        this.app.services.textfields.
                    }
                }
            ],
            offset:pageNumber*count,
            limit:count,
            order:[['createdAt','desc']]
        })*/
        let sql =`
        select 
        project_errors.errormessageid,
        project_errors.projectid ,
        project_errors.appversion,
        project_errors.url,
        project_errors.ua,
        project_errors.browser,
        project_errors.ip,
        project_errors.line,
        project_errors.col,
        project_errors.createdAt,
        textfields.text 
        from project_errors 
        LEFT JOIN 
        textfields 
        on textfields.pid = project_errors.errormessageid 
        where projectid = '${projectid}' 
        order by project_errors.createdAt desc
        limit ${pageNumber*count},${count}
        
      `;
        return this.table.query(sql);
    }
    //登录
  
    
}
module.exports = ProjectError;