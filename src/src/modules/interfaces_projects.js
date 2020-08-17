const { Sequelize, DataTypes, Model } = require('sequelize');
const SequelizeOperate = require('../core/SequelizeOpetate');

class interfaces_projects extends SequelizeOperate{
   
    init(){
        
        this.define('interfaces_projects',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
                allowNull: false,
                comment:"自增ID，主键"
            },
            projectid:{
                type:DataTypes.STRING(50),
                comment:"项目id",
                allowNull: false,
            },
            interfaceid:{
                type:DataTypes.STRING(50),
                comment:"接口ID",
                allowNull: false,
            },
            url:{
                type:DataTypes.STRING(200),
                comment:"接口URL",
                allowNull: false,
            },
            method:{
                type:DataTypes.STRING(16),
                comment:"接口 method 方式",
                allowNull: false,
            },
           
          
            contenttype:{
                type:DataTypes.STRING(16),
                comment:"headers contenttype 内容",
                allowNull: false,
            },
           
            isdel:{
                type:DataTypes.INTEGER,
                comment:"是否有效",
                defaultValue:0,
                allowNull: false,
                
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

        },{
            comment:"接口和项目关联表",
            indexes:[
                {name:"idx-projectindex",fields:['projectid'],length:[50]}
            ]
        });
        this.sync({force:false}).then(_res=>{})
    }

    
}
module.exports = interfaces_projects