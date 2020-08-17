let base = require('./config.base')
let config = {
    ...base,
    port:9000,
    socketport:9001,
    cors:{
        domains:["http://test.local.com","http://localhost:3000","http://test.local.qujianpan.com"]
    }
}
module.exports  = config;