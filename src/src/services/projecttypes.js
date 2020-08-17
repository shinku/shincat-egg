const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
class Projectstypes extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'projecttype';
    }
    //登录
    list(){
        //
        return this.table.findAll();

    }
    //查看项目信息
    insertData({typeid,desc}){
        return this.table.insert({typeid,desc});
    }
}
module.exports = Projectstypes;