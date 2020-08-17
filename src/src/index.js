const domain = require('domain');
let d = domain.create()
process.getRoot=()=>(__dirname);
const App = require('./core/application')
module.exports = App;