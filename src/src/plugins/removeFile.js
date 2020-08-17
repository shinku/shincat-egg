let path = require('path');
let fs = require('fs');
module.exports = (filepath)=>{
    
        let content = fs.unlinkSync(filepath);
        //return content;
        
}