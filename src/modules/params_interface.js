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
           
            interfaceid:{
                type:DataTypes.STRING,
            },
            paramsname:{
                type:DataTypes.STRING,
            },
            paramtype:{
                type:DataTypes.STRING,
            },

        });
        this.sync({force:false}).then(_res=>{
            console.log({
                _res
            });
        })
    }

    
}
module.exports = params_interface