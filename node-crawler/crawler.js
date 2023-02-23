var Crawler = require("crawler");

var c = new Crawler({
    // 在每个请求处理完毕后将调用此回调函数
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ 默认为 Cheerio 解析器
            // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
            var data = [];
            $('.course-list .course-card').each(function(){
              var $this = $(this);
        
          // 使用trim去掉数据两端的空格
              data.push({
                  title : $this.find('.title').text(),
                  url : 'https://coding.imooc.com' + $this.find('a').attr('href')
              })
            });
            console.log(data);
        }
        done();
    }
});

// 将一个URL加入请求队列，并使用默认回调函数
c.queue('https://coding.imooc.com/?c=fe');



