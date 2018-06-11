var cheerio =require('cheerio');

function findImg(dom,callback){
    let $ =cheerio.load(dom);

    $('img').each(function(i,elem){
        let imgSrc =$(this).attr('src');

        // 有的网站有没有http的URI请求,所以排除掉
        if(imgSrc.indexOf('http')==-1&&imgSrc.substr(0,2)=='//'){
            imgSrc='http:'+ imgSrc;
            // console.log(imgSrc);
        }

        // 打印imgSrc
        // console.log(imgSrc);
        
        callback(imgSrc,i);
    });
}

module.exports.findImg=findImg;