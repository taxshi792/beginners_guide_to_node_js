const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");

const index_page = fs.readFileSync("./index_list3-15.ejs", "utf8");
const other_page = fs.readFileSync("./other_list3-12.ejs", "utf8");
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

let data = {msg: "no message..."};
const data2 = {
    "Taro": ["taro@yamada", "09-999-999", "Tokyo"],
    "Hanako": ["hanako@flower", "080-888-888", "Yokohama"],
    "Sachiko": ["sachi@happy", "070-777-777", "Nagoya"],
    "Ichiro": ["ichi@baseball", "060-666-666", "USA"]
};

// indexのアクセス処理
function responce_index(request, response) {
    if (request.method === "POST") {
        let body = "";
        
        // データ受信のイベント処理
        request.on("data", (data) => {
            body += data;
        });
        
        // データ受信終了のイベント処理
        request.on("end", () => {
            data = qs.parse(body);
            // cookieの保存
            setCookie("msg", data.msg, response);
            write_index(request, response);
        });
        
    } else {
        write_index(request, response);
    }
}

// indexの表示の作成
function write_index(request, response) {
    let msg = "※伝言を表示します。";
    
    const cookie_data = getCookie("msg", request);
    
    const content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data,
        cookie_data
    });
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

// cookieの値を設定
function setCookie(key, value, response) {
    const cookie = escape(value);
    response.setHeader("Set-Cookie", [key + "=" + cookie]);
}

// cookieの値を取得
function getCookie(key, request) {
    const cookie_data = request.headers.cookie != undefined ? request.headers.cookie : "";
    const data = cookie_data.split(";");
    
    for (let i in data) {
        if (data[i].trim().startsWith(key + "=")) {
            const result = data[i].trim().substring(key.length + 1);
            return unescape(result);
        }
    }
    return "";
}

// otherのアクセス処理
function responce_other(request, response) {
    const msg = "これはOtherページです。";
    const content = ejs.render(index_page, {
       title: "Other", 
       content: msg,
       data: data2,
       filename: "data_item_list3-6"
    });
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}
