const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class params_interface extends SequelizeOperate{
   
    init(){
        this.define('params_interface',{
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
            name:{
                type:DataTypes.STRING,
            },
            type:{
                type:DataTypes.STRING,
            },
            desc:{
                type:DataTypes.STRING,
            },
            isdel:{
                type:DataTypes.INTEGER
            }
        });
        this.sync({force:false}).then(_res=>{})
    }

    
}
module.exports = params_interface