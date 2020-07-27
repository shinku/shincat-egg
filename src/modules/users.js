const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class users extends SequelizeOperate{
   
    init(){
        this.define('users',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false
            },
            userid:{
                type:DataTypes.STRING,
            },
            username:{
                type:DataTypes.STRING,
            },
            pwd:{
                type:DataTypes.STRING,
            },
            userlisence:{
                type:DataTypes.INTEGER
            },
            isdel:{
                type:DataTypes.INTEGER
            }
        });
        this.sync({force:false}).then(_res=>{
            console.log({
                _res
            });
            
        })
    }

    
}
module.exports = users