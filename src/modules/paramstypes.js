const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class paramstypes extends SequelizeOperate{
   
    init(){
        this.define('paramstypes',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false
            },
            paramtype:{
                type:DataTypes.STRING,
            },

        });
        this.sync({force:false}).then(_res=>{})
    }

    
}
module.exports = paramstypes