var http =require("http");

var server =http.createServer(function(require,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("Hello Node");
});


server.on("connection",function(req,res){

    console.log("链接成功");
});

server.on("request",function(req,res){
    console.log("请求成功");

});

server.listen(3000);

// server.listen 如果不传hostName 则默认监听 localhost