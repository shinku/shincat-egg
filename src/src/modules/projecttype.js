const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class projecttype extends SequelizeOperate{
   
    init(){
        this.define('projecttype',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false,
                comment:"自增ID"
            },
            typeid:{
                type:DataTypes.INTEGER,
                comment:"；类型ID"
            },
            desc:{
                type:DataTypes.STRING(8),
                comment:"类型描述"
            },
            isdel:{
                type:DataTypes.INTEGER,
                comment:"是否有效"
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
        },{comment:"项目类型表"});
        this.sync({force:false}).then(_res=>{
         
        })
    }

    
}
module.exports = projecttype