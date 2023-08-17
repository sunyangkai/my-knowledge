// 请求头例子：
// GET /api/index.php?r=yxzs/site/auto-login&from=h5&token=vwvmjp1457763919&proj_id=39f6699d-edcd-6c55-0218-2fee2c402547&orgcode=fangzhiadmin_test&user_id=39f9ed06-4e2d-411a-a9f1-f325ffbdd8ea&user_type=2&ydxsclienttoken=966a2331-308b-45bf-b211-27206aa1b066&orgCode=fangzhiadmin_test&ydxs_user_id=39f9ed06-4e2d-411a-a9f1-f325ffbdd8ea&channel=ydxs HTTP/1.1
// Accept: */*
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9
// Connection: keep-alive
// Cookie: __tracker_user_id__=2570f7c063c9d40-3fd4006df3-46743b28; _ga=GA1.1.338071868.1686298438; env_orgcode=fangzhiadmin_test; ydxs_app_identity=f83fa65c68226ef28f5f6ed74695e7ce906ec12d61a63d103648fdfda228c975a%3A2%3A%7Bi%3A0%3Bs%3A17%3A%22ydxs_app_identity%22%3Bi%3A1%3Bs%3A140%3A%22%5B%22fangzhiadmin_test%40%4039f9ed06-4e2d-411a-a9f1-f325ffbdd8ea%40%40364936966398e3ebf3f1f874aa926fd5%22%2C%2239f9ed06-4e2d-411a-a9f1-f325ffbdd8ea%22%2C2592000%5D%22%3B%7D; PHPSESSID=2ta16jgtg5cp9clc496s49lbe6; __fast_sid__=258ef2a0b5f8d60-03b600134a-8f205f47
// Host: localhost:3000
// Referer: http://localhost:3000/sub-frontend-mono/task-center/manager/task-center?from=h5&orgcode=fangzhiadmin_test&token=vwvmjp1457763919&proj_id=39f6699d-edcd-6c55-0218-2fee2c402547&user_id=39f9ed06-4e2d-411a-a9f1-f325ffbdd8ea&user_type=2&_history_len=2
// Sec-Fetch-Dest: empty
// Sec-Fetch-Mode: cors
// Sec-Fetch-Site: same-origin
// User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1

// 相应头例子：

// HTTP/1.1 200 OK
// X-Powered-By: Express
// access-control-allow-origin: 0
// date: Tue, 08 Aug 2023 09:34:28 GMT
// content-type: application/json; charset=UTF-8
// transfer-encoding: chunked
// connection: close
// set-cookie: acw_tc=2f624a2616914872682521763e0e0095915d6fd51c84024cbf1541f6127352;path=/;HttpOnly;Max-Age=1800
// set-cookie: PHPSESSID=2ta16jgtg5cp9clc496s49lbe6; path=/; HttpOnly
// yk-cloud-env: origin
// vary: Accept-Encoding
// expires: Thu, 19 Nov 1981 08:52:00 GMT
// cache-control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
// pragma: no-cache
// access-control-allow-headers: Origin, X-Requested-With, Content-Type, Accept, x-fast-trace-id
// access-control-allow-methods: GET, POST, OPTIONS
// access-control-allow-credentials: true
// content-encoding: gzip
// apisix-cache-status: MISS
// server: YK-WAF


/*
    起始行
    GET /home HTTP/1.1 【请求方法、路径、http版本】
    HTTP/1.1 200 OK 【响应 http版本、状态码、原因】

    头部
        请求头
            Accept: text/plain;charset=UTF-8   告诉服务端客户端可处理的媒体类型和子类型（MIME）,在这里指定字符编码不是标准行为
                MIME类型：
                    text/plain：纯文本文件。
                    text/html：HTML文件。
                    application/json：JSON数据格式。
                    application/xml：XML数据格式。
                    application/pdf：PDF文件。
                    image/jpeg：JPEG图像文件。
                    image/png：PNG图像文件。
                    audio/mpeg：MPEG音频文件。
                    video/mp4：MP4视频文件。
            Content-Type: application/x-www-form-urlencoded 字段用于告诉服务器请求体中的内容类型(post/put请求)
                application/x-www-form-urlencoded: 这是HTML表单提交时最常用的类型。数据被编码为键值对，用&分隔。
                multipart/form-data: 这种类型常用于文件上传。new formData()它允许在请求体中发送多部分数据，每一部分可能是不同类型的数据。
                application/json: 当你需要将JSON对象发送到服务器时使用。
            Accept-Charset: UTF-8  指定响应字符编码
            Accept-Encoding:gzip, deflate, br  指定客户端能处理的解压缩方法
            Accept-Language:zh-CN,zh;q=0.9 指定客户端理解的语言
            Connection: keep-alive  管理持久连接  
                keep-alive连接默认是持久的，即连接在传输完一个请求/响应对后不会立即关闭
                close 响应完成后关闭连接

            Cookie: __tracker_user_id__=2570f7c063c9d40-3fd4006df3-46743b28;
            Referer: http://localhost:3000/sub-frontend-mono/task-center  告诉服务器请求是从哪个具体地址发起的。   用途：隐私/日志/请求控制
            User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)  客户端信息：览器名称、版本、操作系统、设备类型等信息  用途： 隐私/日志/请求控制
        响应头
            Content-Type 
            server
            set-cookie:acw_tc=2f624a2616914872682521763e0e0095915d6fd51c84024cbf1541f6127352;path=/;HttpOnly;Max-Age=1800
            access-control-allow-origin   用于指定哪些源站可以访问资源
            access-control-allow-headers: Origin, X-Requested-With, Content-Type, Accept, x-fast-trace-id 只有这些指定的自定义头可以在跨域请求中使用
            access-control-allow-methods: GET, POST, OPTIONS
            access-control-allow-credentials: true  这样做允许浏览器在发出跨域请求时携带凭据（如cookies）
            location    当客户端接收到301状态码时，浏览器通常会自动重定向到响应头中的Location字段所指定的新URL。
    空行

    正文
    消息正文包含请求或响应的有效载荷。对于请求报文，正文可能包含提交的表单数据或上传的文件等。
    对于响应报文，正文通常包含HTML文档、图像或其他资源。消息正文与头部字段之间有一个空行，以便区分。

*/



// https://juejin.cn/post/6844904100035821575


/*

    状态码
    1xx 信息响应
        100 Continue: 请求部分已经被服务器接收，客户端应该继续发送其余部分。
            客户端发送请求头中包含 Expect: 100-continue，表明自己正在请求验证，希望接下来的请求可以继续。
            服务器读取HTTP请求的头部，并检查是否满足所有条件和限制
            如果一切正常，服务器会返回一个100 Continue响应，告诉客户端可以继续发送请求体了。

            这个100状态码通常应用于可能被拒绝的大文件，有助于节省网络带宽和服务器计算资源。
        101 Switching Protocols: 服务器已理解切换协议的请求，并进行协议切换。 通常用于 http和WebSocket之间的切换
            客户端发出请求，并在请求头中包括Upgrade字段，该字段指定了客户端希望切换到的协议（例如 WebSocket）。同时还可能包括Connection: Upgrade字段，表明这是一个协议升级请求。
            服务器解析请求并检查是否支持所请求的协议。如果支持并愿意升级，服务器将响应状态码101 Switching Protocols，并在响应头中包括相同的Upgrade字段，表明服务器同意切换到的协议。
            一旦客户端接收到此响应，连接的协议将更改为Upgrade头中指定的协议，随后的通信将使用新协议。
    2xx 成功响应
        200 OK: 请求成功。
        201 Created: 请求成功，并且服务器已创建了新的资源。 通常在响应头中返回location：uri。实行这个标准有利于多方交互，也不必解析响应体。扩展性考虑：否则当多方交互的时候，需要解析响应体并理解自定义的逻辑
        202 accept 服务端已经接收处理，但未处理完毕。通常用于耗时较长的任务。
            可以让客户端知道请求正在被处理，而不是被忽略或者卡住。
            返回一个uri让客户端可以通过轮询查询服务端完成进度
            优化服务端资源，让耗时请求后台异步处理，以便于响应其它请求。
        204 No Content: 请求成功，但没有需要返回的内容。 通常用于PUT/DELETE 请求。  通常这是基于语义和扩展性考虑。空响应体节省带宽不大
    3xx 重定向
        300 Multiple Choices: 针对请求，服务器可执行多项操作。  例如返回多语言版本的文档，并在响应体中包括每种语言版本的链接。不常见
        301 Moved Permanently: 永久重定向
            请求的URL已永久移动到新位置。  当客户端接收到301状态码时，浏览器通常会自动重定向到响应头中的Location字段所指定的新URL。
            由于301是永久重定向，浏览器可能会缓存这个重定向的信息。这意味着，将来访问旧URL的请求可能会直接由浏览器重定向到新URL，
            但如果重定向信息有所更改，可能会引发问题。
        302 Found: 临时重定向，浏览器不会缓存这个重定向的信息
        304 Not Modified: 自从上次请求后，请求的资源未被修改过。命中了缓存
    4xx 客户端错误
        400 Bad Request: 服务器不理解请求的语法。  http格式不对，少了请求头参数/无效请求参数/请求大小超出限制
        401 Unauthorized: 请求要求身份验证。  没有登录
        403 Forbidden: 服务器理解请求，但拒绝执行它。权限错误
        404 Not Found: 请求的资源无法在服务器上找到。
        429 Too Many Requests: 用户在给定的时间内发送了太多的请求。
    5xx 服务端错误
        500 Internal Server Error: 服务器遇到错误，无法完成请求。 一般是程序报错了
        501 Not Implemented: 服务器不具备完成请求的功能。  某些Web服务器可能仅支持标准的GET和POST方法，而不支持例如PUT或DELETE等其他方法。
        502 Bad Gateway: 服务器作为网关或代理，从上游服务器收到了无效的响应。 上游服务器挂了，检查上游服务器日志
        503 Service Unavailable: 服务器目前无法使用（由于过载或停机维护

    服务端需要配合实现这些状态码的正确返回
*/