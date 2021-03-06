const {v4 : uuid4}  =require('uuid'); 
const ADbService = require("../core/ADbService");

class users extends ADbService{
    constructor(app) {
        super(app);
        this.tableName = 'users';
    }
    getuserinfo({userid}){
        return this.table.find({
            attributes:['userid',"userlisence",'username'],
            where:{
                userid
            }
        });
    }
    //登录
    login(username,pwd){
        //passwrod 需要进行一次安全加密
        return this.table.find({
            attributes:['userid',"userlisence",'username'],
            where:{
                username,
                pwd
            }
        });
    }
    //注册
    async register(username,pwd,userlisence)
    {
        let userid = uuid4();
        return this.table.create({
            userid,
            username,
            pwd,
            userlisence
        })
    }
    //判断是否存在账户
    checkAvriable(username){
        return this.table.find({
            where:{
                username
            }
        });
    }
    //删除用户
    async removeAccount({userid}){
        return this.table.update({
            iddel:1
        },{
            where:{
                userid
            }
        })
    }

    
}
module.exports = users;