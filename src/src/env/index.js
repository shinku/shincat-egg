let env = "";
const setEnv = (_env)=>{
    if(!env){
        env = _env.replace("--","");
    }
}
const getEnv = (_env)=>{
    return env || "dev"
}
module.exports = {
    setEnv,getEnv
}