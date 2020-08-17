class publiccom {
    constructor(){
        this.map = new Map();
    }
    getInstance(){
        if(!publiccom._instance){
            publiccom._instance = new publiccom();
        }
        return publiccom._instance;
    }
    regTarget(name,target){
        this.map.set(name,target);
    }
    getTarget(name){
        return this.map.get(name);
    }
}

module.exports = publiccom.getInstance();