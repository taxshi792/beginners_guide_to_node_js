const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");

const index_page = fs.readFileSync("./index_list3-2.ejs", "utf8");
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
            responce_index(request, response);
            break;
        }
        case "/other": {
            responce_other(request, response);
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

// indexのアクセス処理
function responce_index(request, response) {
    const msg = "これはIndexページです。";
    const content = ejs.render(index_page, {
       title: "Index", 
       content: msg
    });
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

// otherのアクセス処理
function responce_other(request, response) {
    let msg = "これはOtherページです。";
    
    // postアクセス時
    if (request.method === "POST") {
        let body = "";
        
        // データ受信時のイベント処理
        request.on("data", (data) => {
            body += data;
        });
        
        // データ受信終了時のイベント処理
        request.on("end", () =>{
            const post_data = qs.parse(body);
            msg += "あなたは「" + post_data.msg + "」と書きました。";
            const content = ejs.render(other_page, {
                title: "Other",
                content: msg
            });
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
        });
        
    }
    // getアクセス時
    else {
        const msg = "ページがありません。";
        const content = ejs.render(other_page, {
            title: "Other",
            content: msg
        });
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
    }
}
