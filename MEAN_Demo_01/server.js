var express =require('express');

var bodyparser =require('body-parser');

var app =express();
var port =process.env.port || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));



// app.get('/api/users',function(req,res){
//     var user_id =req.param('id');
//     var token =req.param('token');
//     var name =req.param('name');

//     res.send('id是'+user_id+'token是'+token+'名字是'+name);


// });

app.post('/api/users',function(req,res){
    var user_id =req.param('id');
    var token =req.param('token');
    var name =req.param('name');

    res.send('id是'+user_id+'token是'+token+'名字是'+name);


});

app.get('/',function(req,res){
    res.sendfile('homework.html');
});

app.listen(port,function(){

    console.log('监听中');

});


