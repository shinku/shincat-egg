
let Router = require('koa-router');
let bodyparse = require('koa-bodyparser') ;
let static = require('koa-static');
const koaBody = require('koa-body');
let Makerouter = require('../core/corerouter');
let path = require('path');
module.exports = (application)=>{
    let {config,server} = application;
   
    server.use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 20000 * 1024 * 1024    // 设置上传文件大小最大限制，20M
        },
        formLimit: "100mb",
        jsonLimit: "100mb",
        textLimit: "100mb",
        enableTypes: ['json', 'form', 'text']

    }));
    server.use(Makerouter(application));
}