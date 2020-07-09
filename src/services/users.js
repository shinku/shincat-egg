const ADbService = require("../core/ADbService");

class users extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'users';
    }
    //登录
    login(username,pwd){
        //passwrod 需要进行一次安全加密
        return this.table.find({
            attributes:['userid'],
            where:{
                username,
                pwd
            }
        });
    }
    //注册
    async register()
    {

    }
    //判断是否存在账户
    checkAvriable(username){
        return this.table.find({
            where:{
                username
            }
        });
    }
    
}
module.exports = users;