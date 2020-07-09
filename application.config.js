module.exports  = {
    apps:[
        {
            "name":"jdd_mock",
            "script": "src/index.js",
            "instances" : 1,
            "exec_mode" : "cluster",
            "watch":true,
            "args":["dev"],
            "env": {
                "NODE_ENV": "dev"
            },
            "env_production": {
                "NODE_ENV": "dev"
            },
        }
    ]
}