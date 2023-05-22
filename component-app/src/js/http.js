
// 起始行
// 请求 方法、路径、http版本 GET /home HTTP/1.1
// 响应 http版本、状态码、原因  HTTP/1.1 200 OK

// 头部
// 头部字段提供了关于请求或响应的元信息，例如内容类型、内容长度、缓存控制等。
// 每个头部字段由一个键值对组成，键和值用冒号（:）分隔。头部字段通常包含多行，每行表示一个键值对

// 空行

// 正文
// 消息正文包含请求或响应的有效载荷。对于请求报文，正文可能包含提交的表单数据或上传的文件等。
// 对于响应报文，正文通常包含HTML文档、图像或其他资源。消息正文与头部字段之间有一个空行，以便区分。

/*
    请求报文：
    POST /login HTTP/1.1
    Host: example.com
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 27

    username=test&password=1234

    响应报文：
    HTTP/1.1 200 OK
    Date: Mon, 08 May 2023 10:00:00 GMT
    Content-Type: text/html;charset=utf-8
    Content-Length: 1024

    <!DOCTYPE html>
    <html>
    <head>
    <title>Example Page</title>
    </head>
    <body>
    <h1>Welcome to the example page!</h1>
    </body>
    </html>


*/


// https://juejin.cn/post/6844904100035821575