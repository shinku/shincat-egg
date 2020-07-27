const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class ParamsInterface extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'params_interface';
    }
    insert({interfaceid,name,type,desc},...params){
       return this.table.create(
        {interfaceid,name,type,desc},
       ...params)
    }
    count ({userid}){
        return this.table.count({
            where:{userid}
        });
    }
    getDetails({interfaceid},...params){
        return this.table.find({
            where:{
                interfaceid
            },
            ...params
        });
    }
    //登录
  
    
}
module.exports = ParamsInterface;