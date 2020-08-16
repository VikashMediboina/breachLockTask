const qs = require('querystring')
const url = require('url')
const http = require('http')
const jwt = require('jsonwebtoken')
const connection = require("./connection")

const reqfun = {}

reqfun.postReq = (req, res) => {
    const { pathname } = url.parse(req.url)
    if (pathname === '/getCsv') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            reqdata = JSON.parse(body).jsonSQLFormat
            token = JSON.parse(body).token
            jwt.verify(token, 'secret with u and me dont say to any one even you know my key and thanks', (err, decoded) => {
                if (!err) {
                    connection.query("CREATE TABLE data (id VARCHAR(255), level VARCHAR(255),cvss  VARCHAR(255),title VARCHAR(255),Vulnerability VARCHAR(255),Solution VARCHAR(255),reference VARCHAR(255))",
                        function (err, result) {
                            if (err) {
                                if (err.code === "ER_TABLE_EXISTS_ERROR") {
                                    for (i = 0; i < reqdata.length; i = i + 9000) {
                                        connection.query("INSERT INTO data (id, level, cvss, title, Vulnerability, Solution, reference) VALUES ?",
                                            [reqdata.slice(i, i + 9000)]).on('error', function (err) {
                                                return res.end(JSON.stringify({ error: "Unable insert data" }))
                                            })
                                            .on('fields', function (fields) {
                                                if (reqdata.length <= i + 1) {
                                                    return res.end(JSON.stringify({ message: "Sucessfully inserted" }))
                                                }
                                            })
                                            .on('result', function (row) {
                                                if (reqdata.length <= i + 1) {
                                                    return res.end(JSON.stringify({ message: "Sucessfully inserted" }))
                                                }
                                            })
                                    }
                                }
                                else if (err) throw err;
                            }
                            else {
                                for (i = 0; i < reqdata.length; i = i + 9000) {
                                    connection.query("INSERT INTO data (id, level, cvss, title, Vulnerability, Solution, reference) VALUES ?",
                                        [reqdata.slice(i, i + 9000)]).on('error', function (err) {
                                            return res.end(JSON.stringify({ error: "Unable insert data" }))
                                        })
                                        .on('fields', function (fields) {
                                            if (reqdata.length <= i + 1) {
                                                return res.end(JSON.stringify({ message: "Sucessfully inserted" }))
                                            }
                                        })
                                        .on('result', function (row) {
                                            if (reqdata.length <= i + 1) {
                                                return res.end(JSON.stringify({ message: "Sucessfully inserted" }))
                                            }
                                        })
                                }
                            }
                        });
                }
                else {
                    return res.end(JSON.stringify({ error: "token had expired" }))
                }
            })
        });
    }
    else if (pathname === '/login') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            jwt.sign(JSON.parse(body), "secret with u and me dont say to any one even you know my key and thanks", { expiresIn: "190s" }, function (err, token) {
                if (err) {
                    return res.end(JSON.stringify({ error: "error in generating token" }))
                }
                else {
                    return res.end(JSON.stringify({ token: token }))
                }
            });
        })
    }
    else if (pathname === '/view') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            token = JSON.parse(body).token
            jwt.verify(token, 'secret with u and me dont say to any one even you know my key and thanks', (err, decoded) => {
                if (!err) {
                    connection.query("SELECT * FROM data", function (err, result, fields) {
                        if (err) throw res.end(JSON.stringify({ error: "error in server" }));
                        return res.end(JSON.stringify(result))
                    });
                }
                else {
                    return res.end(JSON.stringify({ error: "token had expired" }))
                }
            })
        })
    }
    else if (pathname === '/verifyToken') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            token = JSON.parse(body).token
            jwt.verify(token, 'secret with u and me dont say to any one even you know my key and thanks', (err, decoded) => {
                if (!err) {
                    return res.end(JSON.stringify({ message: "session retained" }))
                }
                else {
                    return res.end(JSON.stringify({ error: "token had expired" }))
                }
            })
        })
    }
    else {
        return handleError(res, 404)
    }
}

function handleError(res, code) {
    res.statusCode = code
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`)
}

module.exports = reqfun
