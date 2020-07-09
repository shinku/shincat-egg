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
            metod:{
                type:DataTypes.STRING,
            },
            response:{
                type:DataTypes.TEXT,
            },
            description:{
                type:DataTypes.TEXT,
            }

        });
        this.sync({force:false}).then(_res=>{
            console.log({
                _res
            });
            
        })
    }

    
}
module.exports = interfaces_projects