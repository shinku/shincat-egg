module.exports  = {
    apps:[
        {
            "name":"socket_skin_storm_prod",
            "script": "src/index.js",
            "instances" : 1,
            "exec_mode" : "cluster",
            "watch":true,
            "args":["production"],
            "env": {
                "NODE_ENV": "development"
            },
            "env_production": {
                "NODE_ENV": "production"
            },
        }
    ]
}