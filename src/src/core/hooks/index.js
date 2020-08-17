const ObjectPool = {};
const PoolProxy  = new Proxy(ObjectPool,{
    get(target,key){
        return  target[key];
    },
    set(target,key,value){
        target[key] = value;
    }
})
const getSequelize = ()=>{
    return PoolProxy['sequelize'];
}
const PoolSet = (key,value)=>{
    PoolProxy[key] = value;
}
module.exports = {
    getSequelize,
    PoolSet
}