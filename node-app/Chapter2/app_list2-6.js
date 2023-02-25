const http = require("http");
const fs = require("fs");

const server = http.createServer(getFromClient);

server.listen(8080);

console.log('Server start!');

// createServerの処理
function getFromClient(request, response) {
    fs.readFile("./index_list2-4.html", "UTF-8",
        (error, data) => {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        }
    );
}

