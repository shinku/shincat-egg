const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class interfaces_projects extends SequelizeOperate{
   
    init(){
        this.define('interfaces_projects',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false
            },
            projectid:{
                type:DataTypes.STRING,
            },
            interfaceid:{
                type:DataTypes.STRING,
            },
            url:{
                type:DataTypes.STRING,
            },
            method:{
                type:DataTypes.STRING,
            },
            response:{
                type:DataTypes.TEXT,
            },
            contenttype:{
                type:DataTypes.STRING,
            },
            description:{
                type:DataTypes.TEXT,
            },
            isdel:{
                type:DataTypes.INTEGER
            }

        });
        this.sync({force:false}).then(_res=>{})
    }

    
}
module.exports = interfaces_projects