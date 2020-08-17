const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class ParamsInterface extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'params_interface';
    }
    insert({interfaceid,name,type,desc,projectid},...params){
       return this.table.create(
        {interfaceid,name,type,desc,projectid},
       ...params)
    }
    update({interfaceid,name,type,desc},...params){
        return this.table.update(
            {name,type,desc},
            {where:{
                interfaceid,
                isdel:0
                }
            },
           ...params)
    }
    deleteAll(interfaceid,...params){
        /*return this.table.delete({
            where:{
                interfaceid
            },
            ...params
        })*/
        return this.table.update({
            isdel:1
        },{
            where:{
                interfaceid
            }
        },...params)
    }
    count ({userid}){
        return this.table.count({
            where:{
                userid,
                isdel:0
            }
        });
    }
    getDetails({interfaceid},...params){
        return this.table.find({
            where:{
                interfaceid,
                isdel:0
            },
            ...params
        });
    }
   
    findWidthPojectId(projectid){
        return this.table.find({
            where:{
                projectid,
                isdel:0
            }
        })
    }

    //登录
  
    
}
module.exports = ParamsInterface;