/**
 * ASequelize 是针对 Sequelize 的上一层封装
 */
const { Sequelize, DataTypes, Model  } = require('sequelize');
const {PoolSet} = require('./hooks');
class ASequelize extends Sequelize{ 
    constructor(application){
        
        const {sequelize} = application.config;
        const {
            host,
            username,
            password,
            database,
            dialect,
            port,
            options
        } = sequelize;
        const _options = {
            host,dialect,port,
            ...options
        }
        super(database,username,password,_options);
        this.application = application;
        PoolSet('sequelize',this);
    }
}
module.exports = ASequelize;