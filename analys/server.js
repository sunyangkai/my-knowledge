var express = require('express');
var fs = require('fs');
var app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // 设置允许所有源的访问
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // 设置允许的 HTTP 方法
    res.setHeader('Access-Control-Allow-Headers', 'Research-Custom-Header');  // 设置允许的 HTTP 头部
    if ('OPTIONS' == req.method) {  // 对预检请求进行特殊处理
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/analyse', async (req, res) => {
    const path = req.query.path;
    const data = await fs.readFileSync(`.${path}/data.txt`, 'utf8');
    const jsonData = JSON.parse(data);
    res.send(jsonData);
});


app.listen(3020, "",  () => {
    console.log('服务启动, 端口:' + 3020)
});