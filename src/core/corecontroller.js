const path= require('path');
const fs = require('fs');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const getController = (app)=>{
    let _path = path.join(process.getRoot(),'./controller');
    let controllerlist = fs.readdirSync(_path);
    let result  = {};
    controllerlist.forEach(_item =>{
        
        //let con = {};
        let stat = fs.statSync(path.join(_path,_item));
        if(stat.isFile()) {
            let operateClass = require(path.join(_path,_item));
            try{ 
                let controler =  new operateClass(app);
                let propers = Object.getOwnPropertyNames(Object.getPrototypeOf(controler))
                //遍历所有的async 函数，并重新托管，以求在执行的时候可以和当前引用绑定
                propers.forEach((_name)=>{
                  
                   if(controler[_name] instanceof AsyncFunction){
                        let fun = controler[_name];
                        controler[_name] = async  (context,...params)=>{
                            
                            controler.context = context;
                            //let pas = [context,]
                            await fun.apply(controler,[context,...params])
                        }
                   }
                  
                })
                result[_item.substr(0,_item.indexOf("."))] = controler;

            }
            catch(e){
                console.log({e});
            }
        }
    })
    return result;
}

module.exports = {
    getController
};