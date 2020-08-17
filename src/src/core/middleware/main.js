
let Router = require('koa-router');
let bodyparse = require('koa-bodyparser') ;
let static = require('koa-static');
const koaBody = require('koa-body');
const corsMiddle = require('./coremiddles/cors');
const timeoutMiddle = require('./coremiddles/timeout')
let Makerouter = require('../corerouter');
let path = require('path');
const  optionHandle = require('./coremiddles/optionHandle');
const staticMiddle = require('./coremiddles/static')
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
    let {
        cors,
        timeout,
        static
    } = config;
    let router = Makerouter(application);
    server.use(timeoutMiddle(timeout));
    server.use(require('./log/log')());
    server.use(optionHandle);
    server.use(staticMiddle(static));
    server.use(corsMiddle(cors));
    server.use(router.routes());
    server.use(router.allowedMethods());
    
}