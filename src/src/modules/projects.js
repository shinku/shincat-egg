const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class projects extends SequelizeOperate{
   
    init(){
        this.define('projects',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false,
                comment:"自增ID"
            },
            projectid:{
                type:DataTypes.STRING(50),
                allowNull: false,
                comment:"项目id"
            },
            projectname:{
                type:DataTypes.STRING(100),
                allowNull: false,
                comment:"项目名称"
            },
            projecttype:{
                type:DataTypes.INTEGER,
                allowNull: false,
                comment:"项目类型"
            },
            projectdescid:{
                type:DataTypes.STRING(50),
                allowNull: false,
                comment:"项目描述id,textfield 数据库外键"
            },
            isdel:{
                type:DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0,
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
        },{
            comment:"项目表"
        ,
            indexes:[{
                name:"idx-projectid",
                fields:[
                    'projectid'
                ]
            }]
        });
        this.sync({force:false}).then(_res=>{})
    }
}
module.exports = projects