const fs = require('fs');
const path = require("path");
module.exports = (content,path)=>{
    //保存文件到 path
    fs.writeFileSync(path,content);
}