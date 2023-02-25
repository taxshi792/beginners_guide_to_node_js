const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const index_page = fs.readFileSync("./index_list2-9.ejs", "utf8");

const server = http.createServer(getFromClient);

server.listen(8080);
console.log('Server start!');

// createServerの処理
function getFromClient(request, response) {
    const content = ejs.render(index_page, {
        title: "Indexページ",
        content: "これはテンプレートを使ったサンプルページです。",
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}
