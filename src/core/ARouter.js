const Router = require('koa-router');
const Controller = require('../core/controller');
class ARouter {
    constructor(app){
        this.app = app;
        this.router = new Router();
    }
    get(path,...params){
        let _self = this;
        //  console.log(Router.prototype.get.apply);
        //this.router.get(path,...params);
        
        Router.prototype.get.apply(this.router,[path].concat(params.map(_item=>{
            return (context,next)=>{
                //console.log.(item _instance Controller)
                _item.call(_self,context,next);
            }
        })));
    }
    post(path,...params){
        let _self = this;
        Router.prototype.post.apply(this.router,[path].concat(params.map(_item=>{
            return (context,next)=>{
                _item.call(_self,context,next);
                //await next();
            }
        })));
    }
   
}
module.exports = ARouter;