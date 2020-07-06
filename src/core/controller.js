const app = require('./application');
let path = require('path');
let fs = require('fs');
class Controller {
    constructor(){
        this.app = app;
        //console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(this)));
    }
    set context(_ctx){
        this._ctx= _ctx
        
    }
    get context(){
        return this._ctx;
    }
}

module.exports = Controller;