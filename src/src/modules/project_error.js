const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class project_error extends SequelizeOperate{
   
    init(){
        this.define('project_error',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false,
                comment:"自增ID"
            },
            projectid:{
                type:DataTypes.STRING(50),
                comment:"项目ID",
                
                allowNull: false,
            },
            errormessageid:{
                type:DataTypes.STRING(50),
                allowNull: false,
                defaultValue:"",
                comment:"报错信息ID,text关联 textfield 外键"
            },
            // app 版本
            appversion:{
                type:DataTypes.STRING(16),
                allowNull: false,
                defaultValue:"",
                comment:"app版本"
            },
            // 报错的url 位置，如果存在的话
            url:{
                type:DataTypes.STRING(200),
                allowNull: false,
                defaultValue:"",
                comment:"报错出现的url场景"
            },
            //浏览器UA 信息，如果存在的话
            ua:{
                type:DataTypes.STRING(200),
                allowNull: false,
                defaultValue:"",
                comment:"报错出现的ua场景"
            },
             // 浏览器信息，如果存在的话
            browser:{
                type:DataTypes.STRING(200),
                allowNull: false,
                comment:"报错出现的浏览器信息",
                defaultValue:""
            },
             // 操作系统，如果存在的话
            ip:{
                type:DataTypes.STRING(30),
                allowNull: false,
                defaultValue:"",
                comment:"报错的客户端来源ip"
            },
           
             // 报错行数
            line:{
                type:DataTypes.STRING(8),
                allowNull: false,
                defaultValue:"",
                comment:"报错出现的行数"
            },
             // 报错烈数
            col:{
                type:DataTypes.STRING(8),
                allowNull: false,
                defaultValue:"",
                comment:"报错出现的列数"
            },
           
            createdAt:{
                type:DataTypes.DATE,
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
                comment:"创建时间"
            },
            updatedAt:{
                type:DataTypes.DATE,
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
               // onUpdate:Sequelize.literal('CURRENT_TIMESTAMP'),
                comment:"更新时间",
            }
        },{comment:"项目报错收集表",indexes:[{
            name:'idx-projectid',
            fields:[
                "projectid"
            ]
        }]});
        this.sync({force:false}).then(_res=>{
        })
    }

    
}
module.exports = project_error