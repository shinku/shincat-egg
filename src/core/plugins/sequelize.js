const fs = require('fs');
const path = require('path');
let Sequelize = require('../ASequelize');
const db = {};
const seq =  {
    DB:db,
    sequelize:null,
    install:(application)=>{
        seq. sequelize = new Sequelize(application);
        //在这里初始化DB
        let modulePath = path.resolve(process.getRoot(),'modules');
        let filelist = fs.readdirSync(modulePath);
        filelist.forEach(_item=>{
            ///console.log({_item})
            let stat = fs.statSync(path.resolve(modulePath,_item));
            if(stat.isFile()){
                //console.log(_item," is a file");
                let name = _item.split('.')[0];
                let ClassOp = require(path.resolve(modulePath,_item));
                db[name] = new ClassOp(application);
            }
            //application.DB
        })
        seq.DB = db;
    }
}
module.exports = seq;