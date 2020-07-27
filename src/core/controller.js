//const app = require('./application.js');
//console.log({app})
let path = require('path');
let fs = require('fs');
const base = require('./ACoreBase')
class Controller extends base{
    
    set context(_ctx){
        this._ctx= _ctx
    }
    get context(){
        return this._ctx;
    }
    send(content,option){
        let {context} = this;
        if(option){
            for(let key in option){
                context.set(key,option[key]);
            }
        };
        context.body = content;
    }
    get request(){
        return this.context.request;
    }
    get query(){
        return this.context.query;
    }
    get params(){
        return this.context.params;
    }
    //获取service 模块
    get services(){
        return this.app.services;
    }
    
    //获取插件模块
    get plugins(){
        return this.app.plugins;
    }
}

module.exports = Controller;