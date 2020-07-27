const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class projects extends SequelizeOperate{
   
    init(){
        this.define('projects',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false
            },
            projectid:{
                type:DataTypes.STRING,
            },
            projectname:{
                type:DataTypes.STRING,
            },
            projecttype:{
                type:DataTypes.INTEGER,
            },
            projectdesc:{
                type:DataTypes.TEXT
            },
            isdel:{
                type:DataTypes.INTEGER
            }
        });
        this.sync({force:false}).then(_res=>{})
    }
}
module.exports = projects