var express =require('express');

var app =express();

app.use(express.static(__dirname +"/public"));
console.log(__dirname +"/public");

app.listen(3000);

console.log("监听3000端口中");