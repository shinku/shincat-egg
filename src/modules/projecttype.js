const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class projecttype extends SequelizeOperate{
   
    init(){
        this.define('projecttype',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false
            },
            typeid:{
                type:DataTypes.INTEGER,
            },
            desc:{
                type:DataTypes.STRING,
            },
            isdel:{
                type:DataTypes.INTEGER
            }
        });
        this.sync({force:false}).then(_res=>{
         
        })
    }

    
}
module.exports = projecttype