const request =require('request');

const cheerio =require('cheerio');

const fs =require('fs');

const targetPage =31;

const targetUrl ='https://www.jianshu.com/u/05f416aefbe1'

var currentPage =1;
var currentCount =0;

const fileName ='result3.md';

function startSpider(){

if(currentPage>targetPage){
    return;
}
    var currentUrl ='https://www.jianshu.com/u/05f416aefbe1?page='+currentPage;

    request(currentUrl,function(err,res,body){
        if (err) {
            return console.error(err);
        }
    
        getBody(body);
       
    });

}


startSpider();



function getBody(body){
    $ =cheerio.load(body);

    const fruits =[];
    $('.note-list>li').each(function(i,elem){
        fruits[i]=$(this).html();
    });

    fruits.join(',');


    for (let index = 0; index < fruits.length; index++) {
         $li =cheerio.load(fruits[index]);
        
        currentCount+=1;
         let url ='https://www.jianshu.com'+$li('.title').attr('href');

         let title =currentCount+'.'+'['+$li('.title').text()+']'+'('+url+')';
         console.log('每篇文章标题:'+title);

         let time =$li('.time').attr('data-shared-at')+'\n';
         console.log(time);

         let readCount ='阅读数:'+parseInt($li('.content>.meta>a').first().text())+' ';
         console.log(readCount);
         let likeCount ='喜欢数:'+parseInt($li('.content>.meta>a').last().text())+' ';
         console.log(likeCount);
         let commentCount ='评论数:'+parseInt($li('.content>.meta>span').text())+'\n';
         console.log(commentCount);

         
         console.log('每篇文章链接:'+url +'\n');
        
         let post =title+readCount+likeCount+commentCount;

        writeText(post);
    }
    
    setTimeout(startSpider,2000);
    currentPage+=1;
}


function writeText(text){

    const defaults = {
        flags: 'a+',
        encoding: 'utf8',
        fd: null,
        mode: 0o666,
        autoClose: true
      };

    fs.open(fileName,'a+',function(err){
        if (err) {
            return console.error(err);
        }
        fs.appendFile(fileName, text,defaults,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
            console.log("--------我是分割线-------------")
            console.log("读取写入的数据！");
           
         });

    })
    
}
