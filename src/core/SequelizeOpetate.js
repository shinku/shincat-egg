
const { getSequelize } = require('./hooks');
const sequeslize = getSequelize();
class SequelizeOperate {
    constructor(application){
       this.application = application;
       this ._db = null;
       this.init();
    }
    init(){
        
    }
    update(...params){
        let {_db} = this;
        return _db.update(...params)
    }
    define(name,option){
        this ._db = sequeslize.define(name,option);
    }
    sync(...params){
        let {_db} = this;
        return _db.sync(...params)
    }
    create(...params){
        let {_db} = this;
        return _db.create(...params)
    }
    find(...params){
        let {_db} = this;
        console.log({_db});
        return _db.findAll(...params)
    }
    findAll(...params){
        let {_db} = this;
        return _db.findAll(...params)
    }
    count(...params){
        let {_db} = this;
        return _db.count(...params);
        /*return _db.findAll({
            attributes:[
                [sequeslize.fn('COUNT'),sequeslize.col('id'), 'count']
            ],
            ...params
        })*/
    }
    //执行查询命令
    query(...params){
        return sequeslize.query(...params)
    }
}
module.exports = SequelizeOperate;