const path = require('path');
const fs = require('fs');
const ARouter = require('./ARouter');
module.exports = (application)=>{
    let router = new ARouter(application);
    let routerDecoratorPath = path.join(process.getRoot(),'routers/index.js');
   
    if(fs.existsSync(routerDecoratorPath))
    {   
        const routerDecorator = require(routerDecoratorPath);
        routerDecorator.call(null,router,application);
    }
    return router.router.routes();
}