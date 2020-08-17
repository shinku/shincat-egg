const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class users extends SequelizeOperate{
   
    init(){
        this.define('users',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false,
                comment:"自增ID"
            },
            userid:{
                type:DataTypes.STRING(50),
                comment:"用户ID",
                allowNull: false,
            },
            username:{
                type:DataTypes.STRING(50),
                comment:"用户姓名",
                allowNull: false,
            },
            pwd:{
                type:DataTypes.STRING(100),
                comment:"密码",
                allowNull: false,
            },
            userlisence:{
                type:DataTypes.INTEGER,
                comment:"用户权限",
                allowNull: false,
            },
            isdel:{
                type:DataTypes.INTEGER,
                comment:"是否有效",
                allowNull: false,
                defaultValue:0
            },
            createdAt:{
                type:DataTypes.DATE,
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
                comment:"创建时间"
            },
            updatedAt:{
                type:DataTypes.DATE,
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate:Sequelize.literal('CURRENT_TIMESTAMP'),
                comment:"更新时间",
            }
        },{
            comment:"是否有效",
            indexes:[{
                unique:true,
                fields:['userid']
            }]
        });
        this.sync({force:false}).then(_res=>{})
    }

    
}
module.exports = users