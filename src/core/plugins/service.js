const fs = require('fs');
const path = require('path');
module.exports = {
    install:(application)=>{
        application.services = {};
        let servicepath  = path.resolve(process.getRoot(),'services');
        let filelist = fs.readdirSync(servicepath);
        filelist.forEach(_item=>{
            ///console.log({_item})
            let stat = fs.statSync(path.resolve(servicepath,_item));
            if(stat.isFile()){
                //console.log(_item," is a file");
                let name = _item.split('.')[0];
                let ClassOp = require(path.resolve(servicepath,_item));
                application.services[name] = new ClassOp(application);
            }
            //application.DB
        })
    }
}