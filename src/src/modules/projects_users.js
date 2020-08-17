const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class projects_users extends SequelizeOperate{
   
    init(){
        this.define('projects_users',{
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
                comment:"项目ID"
            },
            userid:{
                type:DataTypes.STRING(50),
                allowNull: false,
                comment:"用户ID"
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
        },{comment:"用户项目表",
            indexes:[{
                name:"idx-projectid-userid",
                fields:['projectid','userid']
            }]
        });
        this.sync({force:false}).then()
    }
    
}
module.exports = projects_users