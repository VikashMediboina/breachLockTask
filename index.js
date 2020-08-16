const http = require('http')
const reqfun = require("../breachLockTask/node/reqFunc")
var path = require("path")
var fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'POST') {
        return reqfun.postReq(req, res)
    }
})

server.listen(3300);
