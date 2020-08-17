let path = require('path');
const config = {
    timeout:0,

    socketport:8080,
    tempfilepath:()=>{
        return path.join(process.getRoot(),"../../temp/");
    },
    middlewares:[
        "main",
        "apiproxy"
    ],
    static:{
        root:path.join(__dirname,"../static"),
        option:{
            setHeaders:(res,path)=>{
                //console.log(res.setHeader)
                res.setHeader('Content-Type',"text/html");
            },
            extensions:true
        }
    },
    sequelize:{
        /** 基本配置*/
        host:"localhost",
        username:"root",
        password:"StarKu0303",
        database:'jdd',
        dialect:"mysql",
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