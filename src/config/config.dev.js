let base = require('./config.base')
let config = {
    ...base,
    port:9000,
    socketport:9001,
    cors:{
        domains:["*"]
    }
}
module.exports  = config;