const Controller = require('../core/controller');
let path = require('path');
let fs = require('fs');
class usercontroller extends Controller {
    async login(ctx){
        //console.log(this.request.body);
        let {
            username,
            pwd
        } = this.request.body;
        let {context} = this;
        try{
            let result = await this.services.users.login(username,pwd);
            if(result.length > 0){
                this.send({
                    id:result[0].userid
                });
            }
        }catch(e){
            this.send(e);
        }
    }
}
module.exports = usercontroller;