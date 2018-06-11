var http =require("http");

var fs =require("fs");


var server =http.createServer(function(req,res){

    /*
    fs.read('sources/test.html',function(err,data){
        if(err) throw err;
        //自己的猜想
        console.log(data);
        // data肯定是buffer数据类型 所以最后运行时报错
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end(data);
    })

    */

    // 也是错的
    // fs.createReadStream('sources/test.html').pipe(res) 
    
// 想法是 返回一个html返回一个html
  
});

var port =3000;

server.listen (port);

console.log("监听中");
process.on("uncaughtException",function(){
    console.log("报错");
})

