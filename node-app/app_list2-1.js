const http = require("http");

let server = http.createServer(
    (request, response) => {
        response.end('Hello Node.js!');
    }
);

// node.jsのデフォルトのポートは3000だが、
// cloud9上でプレビューするには、8080・8081・8082を指定する必要があるっぽい
// https://docs.aws.amazon.com/ja_jp/cloud9/latest/user-guide/app-preview.html
// https://cross-accelerate-business-create.com/2020/03/21/aws-cloud9-server-port/

// server.listen(3000);
server.listen(8080);
