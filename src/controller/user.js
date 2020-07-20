const Controller = require('../core/controller');
let path = require('path');
let fs = require('fs');
const removeOption = {
    maxAge:-1000
};
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
                    code:1,
                    data:{
                        username:result[0].username,
                        userid:result[0].userid,
                        userlisence:result[0].userlisence
                    }
                });
            }
            else{
                this.send({
                    code:0,
                    data:null,
                    msg:"no info"
                })
            }
        }catch(e){
            this.send(e);
        }
    }
    async addaccount (){
        let {
            username,
            pwd,
            lisence
        } = this.request.body;
        try{
            let result = await this.services.users.register(username,pwd,lisence);
            this.send({
                code:1,
                data:null,
                msg:"done"
            })
        }
        catch(e){
            this.send(e.toString());
        }
    }
    async logout(){
        const {context} = this; 
        
        context.cookies.set('userid',null,removeOption);
        context.cookies.set('username',null,removeOption);
        context.cookies.set('userlisence',null,removeOption);
        this.send({
            code:1,
            data:null,
            msg:"done"
        })
    }
}
module.exports = usercontroller;