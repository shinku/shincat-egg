module.exports  = {
    apps:[
        {
            "name":"jdd_mock",
            "script": "src/index.js",
            "instances" : 1,
            "exec_mode" : "cluster",
            "watch":true,
            "args":["pro"],
            "env": {
                "NODE_ENV": "pro"
            },
            "env_production": {
                "NODE_ENV": "pro"
            },
        }
    ]
}