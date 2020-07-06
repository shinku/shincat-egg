module.exports  = {
    apps:[
        {
            "name":"socket_skin_storm",
            "script": "src/index.js",
            "instances" : 1,
            "exec_mode" : "cluster",
            "watch":true,
            "args":["development"],
            "env": {
                "NODE_ENV": "development"
            },
            "env_production": {
                "NODE_ENV": "production"
            },
        }
    ]
}