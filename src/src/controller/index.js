const Controller = require('../core/controller');
let path = require('path');
let fs = require('fs');
class Index extends Controller{
  
    async start(ctx){
        let {headers} = ctx;
        //console.log(this.app.plugins.sequelize.DB.users.query);
        ctx.body = "hello~";    
        ctx.plugins.sendresult({
            status:200,
            data:100
        });
        //let {users} = this.DB;
        //console.log(users)
    }
    
}
module.exports = Index;