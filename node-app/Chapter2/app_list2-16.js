const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");

const index_page = fs.readFileSync("./index_list2-15.ejs", "utf8");
const other_page = fs.readFileSync("./other_list2-14.ejs", "utf8");
const style_css = fs.readFileSync("./style_list2-11.css", "utf8");

const server = http.createServer(getFromClient);

server.listen(8080);
console.log('Server start!');

// createServerの処理
function getFromClient(request, response) {
    const url_parts = url.parse(request.url);
    
    switch (url_parts.pathname) {
        case "/": {
            const content = ejs.render(index_page, {
                title: "Index",
                content: "これはIndexページです。",
            });
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
            
            break;
        }
        case "/other": {
            const content = ejs.render(other_page, {
                title: "Other",
                content: "これは新しく用意したページです。",
            });
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
            
            break;
        }
        case "/style": {
            response.writeHead(200, {"Content-Type": "text/css"});
            response.write(style_css);
            response.end();
            
            break;
        }
        default: {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end("no page...");
            
            break;
        }
    }
}
