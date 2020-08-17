let base = require('./config.base')
let config = {
    ...base,
    port:9000,
    socketport:9001,
    sequelize:{
        /** 基本配置*/
        host:"rm-uf6tyfxzj516926nh.mysql.rds.aliyuncs.com",
        username:"jdd_h5_admin",
        password:"duXuLZpglq9EQMXK",
        database:'jdd',
        dialect:"mysql",
        protocol:'mysql',
        port:'3306',
        /**其他配置 */
        options:{
            //开启连接池
            pool:{
                //开启10个连接池
                max: 10,
                idle: 30000
            }
        }
    }
}
module.exports = config;