


const serverPush = () => {
    // 导入所需模块
    const http2 = require('http2');
    const fs = require('fs');
    const path = require('path');

    // 读取证书文件，HTTP/2 需要使用 HTTPS
    const serverOptions = {
    key: fs.readFileSync('your-private-key.pem'),
    cert: fs.readFileSync('your-certificate.pem')
    };

    // 创建 HTTP/2 服务器
    const server = http2.createSecureServer(serverOptions);

    // 处理请求
    server.on('stream', (stream, headers) => {
        const requestPath = headers[':path'];

        // 如果客户端请求 index.html
        if (requestPath === '/') {
            stream.respondWithFile(path.join(__dirname, 'index.html'), {
            'content-type': 'text/html'
            });

            // 服务端推送 main.js
            const pushStream = stream.pushStream({ ':path': '/main.js' }, (err, pushStream, headers) => {
            if (err) {
                console.error(err);
                return;
            }

            pushStream.respondWithFile(path.join(__dirname, 'main.js'), {
                'content-type': 'application/javascript'
            });
            });

        } else if (requestPath === '/main.js') {
            // 客户端直接请求 main.js 时的处理
            stream.respondWithFile(path.join(__dirname, 'main.js'), {
            'content-type': 'application/javascript'
            });

        } else {
            // 其他请求返回 404
            stream.respond({ ':status': 404 });
            stream.end('Not Found');
        }
    });

    // 启动 HTTP/2 服务器
    server.listen(3000, () => {
    console.log('HTTP/2 server is listening on port 3000');
    });

}

const sslConfigForNgix = () => {
    /*
            要为您的网站申请 SSL 证书，您可以选择购买商业证书或使用免费证书。免费证书的一个流行选择是 Let's Encrypt。以下是使用 Let's Encrypt 为您的网站申请免费 SSL 证书的方法：

            1. 安装 Certbot：
            Certbot 是 Let's Encrypt 官方推荐的工具，用于自动申请、配置和续订 SSL 证书。访问 Certbot 网站 (https://certbot.eff.org/)，然后选择您的 Web 服务器软件和操作系统。按照网站上提供的说明安装 Certbot。

            2. 停止 Web 服务器：
            在申请证书之前，您可能需要暂时停止 Web 服务器。这是因为 Certbot 在验证域名所有权时可能需要使用 80 或 443 端口。使用您的 Web 服务器的控制命令停止服务器，例如 `sudo service nginx stop`（对于 Nginx）或 `sudo service apache2 stop`（对于 Apache）。

            3. 申请 SSL 证书：
            使用 Certbot 为您的域名申请证书。在命令行中运行以下命令，替换 `your-domain.com` 为您的域名：
            
            ```
            sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com
            ```
            
            Certbot 会引导您完成验证域名所有权的过程。验证成功后，您的证书和私钥将被存储在 `/etc/letsencrypt/live/your-domain.com/` 目录中。

            4. 配置 Web 服务器：
            根据您的 Web 服务器和应用程序，配置 SSL 证书和私钥。以下是一个 Nginx 示例：

            ```
            server {
                listen 80;
                server_name your-domain.com www.your-domain.com;
                return 301 https://$host$request_uri;
            }

            server {
                listen 443 ssl;
                server_name your-domain.com www.your-domain.com;

                ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

                # 其他 SSL 和服务器配置
            }
            ```

            对于 Node.js，您需要在 `https.createServer` 函数中指定证书文件的路径，如之前的回答中所示。

            5. 重启 Web 服务器：
            重新启动您的 Web 服务器以使更改生效。例如 `sudo service nginx start`（对于 Nginx）或 `sudo service apache2 start`（对于 Apache）。

            6. 设置自动续订：
            Let's Encrypt 证书的有效期为 90 天。要避免过期，您可以设置一个 cron 任务以自动续订证书。在命令行中运行 `sudo crontab -e`，然后添加以下行：

            ```
            0 3 * * * /usr/bin/certbot renew --quiet --post-hook "service nginx reload"
            ```
    */
    
}

const differrentBetweenHttp1AndHttp2 = () => {
    /*
         1.多路复用，单个tcp连接发送多个http请求/响应
            通过将请求和响应分割成更小的帧（Frames），然后对这些帧进行编码和解码，实现了多路复用。
            这些帧被分到多个流（Stream）中，每个流都有一个唯一的标识符Stream ID。
            http1有浏览器最大连接数限制，http2没有，因为有多路复用，最大连接数受机器配置限制。
         2.头部压缩，压缩请求/响应的头部（HPACK算法）。HTTP/1中的头部信息在每个请求和响应中都需要完整发送，导致了冗余的数据传输。
         3.服务器推送
            采取多路复用技术，推送多个客户端也不会产生多个tcp连接。
            在大多数情况下，服务端推送能够提高 Web 应用程序的性能，并且不会对服务器产生很大的压力，是可接受的。
            在一些特定场景下，如推送大量大文件时，服务器的压力可能会增加

         4.二进制传输。
           （
             1.而二进制编码不受字符集的限制，可以使用更紧凑的编码方式来表示数据
             2.不用考虑空格、换行等可读性字符
             3.专门的压缩算法
            ）
         5.流量优先级
     */
}


const https = () => {
    /*
        https提供三大功能
        1.加密（Encryption），对数据加密来使其免受窃听者对数据的监听
        2.数据一致性(Data integrity)，数据在传输的过程中不会被窃听者所修改
        3.身份认证(Authentication)，防止中间人攻击并建立用户信任
    */
}

const tsl = () => {
    /*
        TLS(Transport Layer Security) 是 SSL(Secure Socket Layer) 的后续版本。
        SSL/TLS 通过将称为 X.509 证书的数字文档将 网站和公司的实体信息 绑定到加密密钥来进行工作。
        SSL 是一个独立的协议，不只有 HTTP 可以使用，其他应用层协议也可以使用，比如 SMTP(电子邮件协议)、Telnet(远程登录协议) 等都可以使用。


        对称加密：指加密和解密时使用的密钥都是同样的密钥。 要保证密钥传输的安全性。简单速度快，适合加密大量数据。
        非对称加密：公钥加密，私钥解密。复杂速度慢。非对称加密通常用于密钥交换、身份验证和数字签名，而不是直接加密大量数据。
        混合加密：对称加密用于数据传输，非对称加密用于密钥交换。


     */

}
