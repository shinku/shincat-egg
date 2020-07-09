const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class projects_users extends SequelizeOperate{
   
    init(){
        this.define('projects_users',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false
            },
            projectid:{
                type:DataTypes.STRING,
            },
            userid:{
                type:DataTypes.STRING,
            }
        });
        this.sync({force:false}).then(_res=>{
            console.log({
                _res
            });
            
        })
    }

    
}
module.exports = projects_users