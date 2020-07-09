const Router = require('koa-router');
const Controller = require('../core/controller');
const buildPreams = (path,...params)=>{
    return [path].concat(params);
}
class ARouter {
    constructor(app){
        this.app = app;
        this.router = new Router();
    }
    get(path,...params){
        Router.prototype.get.apply(this.router,buildPreams(path,...params));
    }
    post(path,...params){
       
        Router.prototype.post.apply(this.router,buildPreams(path,...params));
    }
    all(path,...params){
        Router.prototype.all.apply(this.router,buildPreams(path,...params));
    }
   
}
module.exports = ARouter;