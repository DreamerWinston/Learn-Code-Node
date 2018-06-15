/**
 * 
 * 目标
 * 1.给与目标传递一个数组,数组包含书名,生成相关md文件
 * 
 * 2.首先设计如何请求京东 并且拿到相关书籍
 * 
 * 3.设计如何请求当当网 并且拿到相关书籍
 * 
 * 
 */



var request =require('request');

var iconv =require('iconv-lite');

var https =require('https');
var http =require('http');

const cheerio =require('cheerio');

const fs =require('fs');

const jdUrl ='https://search.jd.com/Search?keyword=javascript高级程序设计&wq=javascript高级程序设计&enc=utf-8';

const ddUrl ='http://search.dangdang.com/?key=JavaScript%B8%DF%BC%B6%B3%CC%D0%F2%C9%E8%BC%C6&act=input'

var arrName=[
    '锋利的jquery',
    'JavaScript',
    'JavaScript高级程序设计'
];

var currentBook =0;

var arrjd=new Array();
var arrdd=new Array();

function setData(){
    var jdReq,ddReq;

    for (let index = 0; index < arrName.length; index++) {
        const keyword = arrName[index];
        

        jdReq ='https://search.jd.com/Search?keyword='+keyword+'&wq='+keyword+'&enc=utf-8';

        ddReq ='http://search.dangdang.com/?act=input&key='+keyword+'&ddsale=1';

        arrjd.push(jdReq);
        arrdd.push(ddReq);
    }
}

function startPider(){
    if(currentBook>arrName.length-1)return;

//    goJD(arrjd[currentBook]);
   goDD(arrdd[currentBook]);

//    setTimeout(startPider,1000);
    currentBook+=1;

}

function goJD(jdReq){
        
    console.log(jdReq);

    var options = {
        url: jdReq,
        headers: {
            'User-Agent': 'request'
            }
       };

    //    这里要加请求头,不然返回默认的京东首页

    request(options,function(err,res,body){

        if (err) {
            return console.error(err);
        }

        getJDBody(body);
 
     });
}

function goDD(ddReq){

    http.get(encodeURI(ddReq),function(res){  
        var length=0;  
        var arr=[];  
        res.on("data",function(chunk){  
            arr.push(chunk);  
            length+=chunk.length;  
        });     
        res.on("end",function(){  
            var data=Buffer.concat(arr,length);  
            var change_data = iconv.decode(data,'gbk');   
            getDDBody(change_data.toString());
        })   
    }); 
}

setData();
startPider();


function getJDBody(body){

    $JD =cheerio.load(body);

    const fruits =[];

    $JD(".gl-warp.clearfix>li").each(function(i,elem){

        fruits[i]=$JD(this).html();
    });

    fruits.join(',');
    $JDul =$JD(".gl-warp.clearfix");
    // console.log($ul.children()[0]['attribs']['data-sku']); 

    

    // console.log($ul.find('li').attr('data-sku'));
    // console.log($ul.children().attr('data-sku')); 

    

    fs.writeFile('test.html',$JD(".gl-warp.clearfix").html(),function(err){
        if(err){
            return console.error(err);
        }
        console.log("成功");
    })

    
    

    for (let index = 0; index < fruits.length; index++) {

        $JDli =cheerio.load(fruits[index]);
        
        if($JDli('.curr-shop').text()!='京东自营')continue;



        var item_id =$JDul.children()[index]['attribs']['data-sku'];
        var detail ='https://item.jd.com/'+item_id+'.html';
        console.log(detail);

        getJDDetail(detail);
    }

}

function getJDDetail(detail){


https.get(detail,function(res){  
    var length=0;  
    var arr=[];  
    res.on("data",function(chunk){  
        arr.push(chunk);  
        length+=chunk.length;  
    });     
    res.on("end",function(){  
        var data=Buffer.concat(arr,length);  
        var change_data = iconv.decode(data,'gbk');   
        getJDDetailBody(change_data.toString());
    })   
}); 

}

function getJDDetailBody(body){

    $JDDetail =cheerio.load(body);

    console.log($JDDetail('#parameter2').text());
    
    fs.writeFile('test2.html',body,function(err){
        if(err){
            return console.error(err);
        }
        console.log("成功");
    })
}

function getDDBody(body){
    $DD =cheerio.load(body);


    const items =[];

    $DD('.con.shoplist>li').each(function(i,elem){
        items[i]=$DD(this).html();

    });

    items.join(',');

    $DDul =$DD('.con.shoplist');
    // $DDul =$DD('#search_nature_rg');

    fs.writeFile('DDtest.html',$DD('.con.shoplist').html(),function(err){
        if(err){
            return console.error(err);
        }
        console.log("成功");
    })
}