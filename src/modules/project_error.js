const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class project_error extends SequelizeOperate{
   
    init(){
        this.define('project_error',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false
            },
            projectid:{
                type:DataTypes.STRING,
            },
            errormessage:{
                type:DataTypes.TEXT,
            },
            // app 版本
            appversion:{
                type:DataTypes.STRING,
            },
            // 报错的url 位置，如果存在的话
            url:{
                type:DataTypes.STRING,
            },
            //浏览器UA 信息，如果存在的话
            ua:{
                type:DataTypes.STRING,
            },
             // 浏览器信息，如果存在的话
            browser:{
                type:DataTypes.STRING,
            },
             // 操作系统，如果存在的话
            os:{
                type:DataTypes.STRING,
            },
             // 报错内容
            msg:{
                type:DataTypes.STRING,
            },
             // 报错行数
            line:{
                type:DataTypes.STRING,
            },
             // 报错烈数
            col:{
                type:DataTypes.STRING,
            },
             // 报错对象
            error:{
                type:DataTypes.STRING,
            }
        });
        this.sync({force:false}).then(_res=>{
        })
    }

    
}
module.exports = project_error