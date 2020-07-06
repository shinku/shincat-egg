const Controller = require('../core/controller');
let path = require('path');
let fs = require('fs');
class Index extends Controller{
    constructor(){
        super();
        this.name = "index23232"
    }
    async start(ctx){
        let {headers} = ctx;
        ctx.body = "hello~";    
        console.log(ctx.plugins)
        ctx.plugins.sendresult({
            status:200,
            data:100
        })
    }
    async getFile(ctx){
        let {filename} = ctx.params;
        //let content = fs.readFileSync(path.join(process.cwd(),"../temp/"+filename));
        let {plugins} = this.app;
        let {getFile} = plugins; 
        let content = getFile(path.join(process.getRoot(),"../../temp/"+filename));
        ctx.set('Content-Type',"application/json;charset=UTF-8");
        ctx.body=content;
    }
    async getFileFromMembery(ctx){
        //
        let {number} = ctx.params;
        let content =  this.app.plugins.projectmanager.getProjectFileFromMembery(number);
        ctx.set('Content-Type',"application/json;charset=UTF-8");
        if(content){
            ctx.body=content.data.str;
        }
        else{
            ctx.body="404";
        }
        //console.log(content.data.str);
        
    }
    async getSocketNumbers(ctx){
        ctx.body = this.app.plugins.appstores.getNumberList(); 
    }
    async uploadJddee(ctx){
        
        const {
            jddee,
            number,
        } = ctx.request.body;
        const {
            app
        } = this;
        if(jddee){
            app.plugins.storeContent(jddee,path.join(process.getRoot(),`../../temp/${number}.jddee`));
        };
        //console.log( app.plugins.projectmanager);
        app.plugins.projectmanager.setProjectFileIntoMembery(number);
        ctx.body = `file/${number}.jddee`;
    }
    async upload(ctx){
        
        let {files} = ctx.request;
        //console.log(files.file);
        let paths =[]
        files.file.forEach(_item=>{
            //console.log(_item.path);
            //console.log(_item.name);
            let readstream = fs.createReadStream(_item.path);
            let filenamename = (Math.random()*0xFFFFFF>>0)+"_"+_item.name;
            let writestream = fs.createWriteStream(path.join(process.getRoot(),"../../temp/"+filenamename));
            readstream.pipe(writestream);
            paths.push({
                file:_item.name,
                url:`/file/${filenamename}`
            });
            readstream.on('end',()=>{
                console.log('uploadeone');
            })
        });
       
        ctx.body=paths;
       
    }
}
module.exports = Index;