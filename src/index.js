process.getRoot=()=>{
    return __dirname
}
let APP = require('./core/application');
//console.log(process.argv);
console.log("NODE_ENV",process.env.NODE_ENV);  