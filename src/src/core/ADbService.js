//const app = require('./application.js');
//console.log({app})
const base = require('./ACoreBase')
class ADbService extends base{
    
    constructor(app){
        super(app);
        this._tablename = "";
    }
    set tableName(name){
        //设置table
        this._tablename = name;
    }
    get tableName(){
        return this._tablename;
    }
    get table(){
        if(this._tablename){
            //类似于 DB['users'] 的方式，可以直接获取到操作数据库的 
            // SequelizeOperate 对象
            // SequelizeOperate ： core/SequelizeOperate.js
            return this.DB[this._tablename];
        }
    }
    get DB(){
        // sequelize.DB;
        //  sequelize plugin 是核心插件
        return this.app.plugins.sequelize.DB;
    }
}

module.exports = ADbService;