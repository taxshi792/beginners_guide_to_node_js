const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");

const index_page = fs.readFileSync("../Chapter2/index_list2-15.ejs", "utf8");
const other_page = fs.readFileSync("../Chapter2/other_list2-14.ejs", "utf8");
const style_css = fs.readFileSync("../Chapter2/style_list2-11.css", "utf8");

const server = http.createServer(getFromClient);

server.listen(8080);
console.log('Server start!');

// createServerの処理
function getFromClient(request, response) {
    const url_parts = url.parse(request.url, true);
    
    switch (url_parts.pathname) {
        case "/": {
            let content = "これはIndexページです。";
            const query = url_parts.query;
            
            if (query.msg !== undefined) {
                content += "あなたは「" + query.msg + "」と送りました。";
            }
            
            content = ejs.render(index_page, {
                title: "Index",
                content,
            });
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
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
