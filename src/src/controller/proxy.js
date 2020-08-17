const Controller = require('../core/controller');
let path = require('path');
let fs = require('fs');
const removeOption = {
    maxAge:-1000
};
class ProxyController extends Controller {
   async apiUse(ctx){
    
     let reg = /(?<=^\/api\/).*/;
    
     let apicontent = this.context.url.match(reg);
     console.log(JSON.stringify({url:this.context.url,apicontent}))
     //apicontent 的基本结构： /{projectid}/{apiurl}
     if(apicontent){
         /*this.send({
            apicontent
         })*/
         let linkarr = apicontent.toString().split("/");
         let projectid = linkarr[0];
         let apiurl = apicontent.toString().replace(projectid,"");

         let table = this.services.projectInterface.table;
         
         let result = await table.find({where:{
             projectid,
             url:apiurl
            }});
        
         if(result.length >0){
            this.context.set("Proxy-projectid",projectid);
            this.context.set("Proxy-apiurl",apiurl);
            let {interfaceid} = result[0];
            let textres = await this.services.textfield.findWithIds([interfaceid]);

            this.send(
                textres.length>0?JSON.parse(textres[0].text).response:"{code:0,msg:'nomsg',data:'nodata'}"
            );
         }
         else{
            this.context.status = 404;
            this.send({
                projectid,
                apiurl,
                code:400,
                msg:"当前projectid/apiurl无效，请确认projectid以及apiurl是否正确,"
            })
         }
        

     }
   }
}
module.exports = ProxyController;