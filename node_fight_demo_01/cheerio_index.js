var request =require('request');
var path =require('path');
var config =require('./cherrio_config');
var analyze =require('./cheerio_analyze');
var fs =require('fs');


function start(){
    request(config.url,function(err,res,body){
        console.log('开始');

        if(!err&& res){
            console.log('爬取');
            analyze.findImg(body,download);
        }

    })
}

function download(imgUrl,i){

    let ext =imgUrl.split('.').pop();


    var url= path.join(config.imgDir,i+'.'+ext);


    //过滤掉路径中?号的东西
    if(url.indexOf('?')!=-1){
        var length =url.indexOf('?');
        console.log(1111);
        url =url.substr(0,length);
    }


    
    request(imgUrl).pipe(fs.createWriteStream(url,{'encoding':'utf8'}))


// 如果失败了 那么一定是没有针对网站做url正则去除字符串


}

start();