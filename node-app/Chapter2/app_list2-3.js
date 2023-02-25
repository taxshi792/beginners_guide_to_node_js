const http = require("http");

let server = http.createServer(
    (request, response) => {
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCTYPE html><html lang="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title></head>');
        response.write('<body><h1>Hello Node.js!</h1>');
        response.write('<p>This is Node.js sample page.</p>');
        response.write('<p>これは、Node.jsのサンプルページです。</p', 'utf8');
        response.write('</body></html>');
        response.end();
    }
);

// node.jsのデフォルトのポートは3000だが、
// cloud9上でプレビューするには、8080・8081・8082を指定する必要があるっぽい
// https://docs.aws.amazon.com/ja_jp/cloud9/latest/user-guide/app-preview.html
// https://cross-accelerate-business-create.com/2020/03/21/aws-cloud9-server-port/

// server.listen(3000);
server.listen(8080);

console.log('Server start!');