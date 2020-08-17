const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class paramstypes extends SequelizeOperate{
   
    init(){
        this.define('paramstypes',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false,
                comment:"id外键"
            },
            paramtype:{
                type:DataTypes.STRING(4),
                comment:"字段类型",
                allowNull: false,
            }, 
            isdel:{
                type:DataTypes.INTEGER,
                comment:"是否有效",
                allowNull: false,
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

        },{comment:"字段类型表"});
        this.sync({force:false}).then(_res=>{})
    }

    
}
module.exports = paramstypes