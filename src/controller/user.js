const Controller = require('../core/controller');
let path = require('path');
let fs = require('fs');
class usercontroller extends Controller {
    login(ctx){
        let {
            username,
            pwd
        } = this.request.body;
        if(!username && ! pwd){

        }
    }
}
module.exports = usercontroller;