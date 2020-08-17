const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class TextField extends SequelizeOperate{
   
    init(){
        this.define('textfields',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false,
                comment:"自增ID"
            },
            text:{
                type:DataTypes.TEXT,
                comment:"；类型ID",
                allowNull: false,
                defaultValue:""
            },
            type:{
                type:DataTypes.STRING,
                comment:"类型描述",
                allowNull: false,
            },
            pid:{
                type:DataTypes.STRING(50),
                comment:"外键ID",
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
                //onUpdate:Sequelize.literal('CURRENT_TIMESTAMP'),
                comment:"更新时间",
            }
        },{
            comment:"TEXT表",
            indexs:[
                {
                    name:"idx-pid",
                    fields:['pid']
                }
            ]
        });
        this.sync({force:false}).then(_res=>{
         
        })
    }

    
}
module.exports = TextField