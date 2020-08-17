const ADbService = require("../core/ADbService");
const {v4 : uuid4}  =require('uuid'); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class textField extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'textfield';
    }
    insert({text,pid,type},...params){
       return this.table.create(    
        {text,pid,type},
       ...params)
    }
    findWithIds(pidarr,...params){
        return this.table.find({
            where:{
                pid:{
                    [Op.in]:pidarr
                },
                isdel:0
            }
        },...params)
    }
    
    async update({text,pid,type},...params){
        /*let sql = `
        update textfields set text ='${text}'
        where pid ='${pid}'
        `;
        return this.table.query(sql,...params)*/
        let count = await this.table.count({where:{pid}});
        if(count == 0 ){
            return this.insert({text,pid,type},...params);
        }else{
            return this.table.update({
                text
            },{
                where:{
                    pid
                }
            },...params)
        }
       
    }
    

    //登录
  
    
}
module.exports = textField