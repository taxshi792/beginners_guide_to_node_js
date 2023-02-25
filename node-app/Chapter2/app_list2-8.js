const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const index_page = fs.readFileSync("./index_list2-7.ejs", "utf8");

const server = http.createServer(getFromClient);

server.listen(8080);
console.log('Server start!');

// createServerの処理
function getFromClient(request, response) {
    const content = ejs.render(index_page);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

