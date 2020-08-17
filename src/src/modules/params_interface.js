const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class params_interface extends SequelizeOperate{
   
    init(){
        this.define('params_interface',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false,
                comment:"自增ID"
            },
            projectid:{
                type:DataTypes.STRING(50),
                comment:"接口ID",
                allowNull: false,
            },
            interfaceid:{
                type:DataTypes.STRING(50),
                comment:"接口ID",
                allowNull: false,
            },
            name:{
                type:DataTypes.STRING(16),
                comment:"字段名称",
                allowNull: false,
            },
            type:{
                type:DataTypes.STRING(4),
                comment:"字段类型",
                allowNull: false,
            },
            desc:{
                type:DataTypes.STRING(100),
                comment:"字段描述",
                allowNull: false,
            },
            isdel:{
                type:DataTypes.INTEGER,
                comment:"是否有效",
                allowNull: false,
                defaultValue:0,
            },
            createdAt:{
                type:DataTypes.DATE,
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
                comment:"创建时间"
            },
            updatedAt:{
                type:DataTypes.DATE,
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
                //onUpdate:Sequelize.literal('CURRENT_TIMESTAMP'),
                comment:"更新时间",
            }
        },{ comment:"字段接口表",
            indexes:[{
                name:'idx-rojectid',
                fields:['projectid']
            }]
        });
        this.sync({force:false}).then(_res=>{})
    }

    
}
module.exports = params_interface