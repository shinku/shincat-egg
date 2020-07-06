let path = require('path');
const config = {
    socketport:8080,
    tempfilepath:()=>{
        return path.join(process.getRoot(),"../../temp/");
    }
}
module.exports = config;