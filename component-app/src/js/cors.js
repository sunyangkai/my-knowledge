

/*
    1.CORS (跨来源资源共享):
    CORS 是一种浏览器和服务器之间的通信标准，通过设置 HTTP 响应头来实现跨域资源共享。

    服务器端需要设置响应头：
    response.setHeader("Access-Control-Allow-Origin", "*"); // 允许所有来源访问
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); // 允许的请求方式
    response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // 允许的请求头

    客户端：
    fetch("https://example.com/data", {
    method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })；


    2.利用没有跨域限制的 script 标签加载预设的 callback 将内容传递给 js
    客户端：
    function jsonpCallback(data) {
      console.log(data);
    }

    const script = document.createElement("script");
    script.src = "https://example.com/data?callback=jsonpCallback";
    document.body.appendChild(script);

    服务端：
        const server = http.createServer((req, res) => {
        const url = parse(req.url, true); // 解析 url

            // 只有路由为 `/user` 的 GET 请求会被响应
            if (req.method === 'GET' && url.pathname === '/user') {
                const { callback } = url.query; // 获取 callback 回调名称
                
                if (callback) // 如果传递了 callback 参数，说明是 JSONP 请求
                return res.end(`${callback}(${JSON.stringify(data)})`);
                else // 没传递 callback，直接当做不跨域的 GET 请求返回数据
                return res.end(JSON.stringify(data));
            }
            return res.end('Not Found'); // 不匹配的路由返回错误
        });

    JSONP 会从其它域加载 JavaScript 脚本并直接执行，如果 JavaScript 脚本中包含恶意攻击代码，那我们的网站将会受到威胁。   
    错误处理：script 标签的 onerror 函数在 HTML5 才定义


    ngix代理：

    http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        location /api/ {
            # 被代理的后端服务器地址
            proxy_pass http://backend_server_address;

            # 设置跨域相关的响应头
            add_header Access-Control-Allow-Origin $http_origin always;
            add_header Access-Control-Allow-Credentials 'true' always;
            add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header Access-Control-Allow-Headers 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;

            # 预检请求处理
            if ($request_method = OPTIONS) {
                return 204;
            }
        }
    }
}

*/