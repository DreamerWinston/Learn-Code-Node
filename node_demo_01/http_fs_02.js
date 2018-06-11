var http =require("http");

var fs =require("fs");


var server =http.createServer(function(req,res){
    if(req.url =="/"){
        var fileList =fs.readdirSync("./");
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end(fileList.toString());
    }else{
        var path =req.url;

        fs.readFile("."+path,function(err,data){
            if(err){
                res.end("error");
                throw err;
            }
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end(data);
        })
    }
});

var port =3000;

server.listen (port);

console.log("监听中");
process.on("uncaughtException",function(){
    console.log("报错");
})

