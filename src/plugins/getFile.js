let path = require('path');
let fs = require('fs');
module.exports = (filepath)=>{
        if(!fs.existsSync(filepath)) return null;
        let content = fs.readFileSync(filepath);
        return content;
        
}