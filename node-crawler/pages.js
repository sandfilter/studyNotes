var request = require('request'),
	cheerio = require('cheerio');
const fs = require('fs');

// 把page作为参数传递进去，然后调用request进行抓取
function getData(page){
  var url = 'https://coding.imooc.com/?c=fe&sort=0&unlearn=0&page='+page;
  console.time(url);
  request(url, function(err, response, body){
      if( !err && response.statusCode == 200 ){
          console.timeEnd(url); // 通过time和timeEnd记录抓取url的时间

          var $ = cheerio.load(body);

          var data = [];
          $('.course-list .course-card').each(function(){
              var $this = $(this);
        
          // 使用trim去掉数据两端的空格
              data.push({
                  title : trim($this.find('.title').html()),
                  url : trim( ' https://coding.imooc.com' + $this.find('a').attr('href')),
              })
          });
          // console.log( JSON.stringify(data, ' ', 4) );
          // console.log(data);
          var filename = './file/cnode_'+page+'.txt';
          fs.writeFile(filename, JSON.stringify(data, ' ', 4), function(){
              console.log( filename + ' 写入成功' );
          })
          dis.call();
      }
  });
}
// 删除字符串左右两端的空格
function trim(str){ 
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/*
  @param data []  需要请求的链接的集合
  @param max  num 最多同时请求的数量
*/
// function Dispatch(data, max){
//     var _max = max || 2, // 最多请求的数量
//         _dataObj = data || [], // 需要请求的url集合
//         _cur = 0, // 当前请求的个数
//         _num = _dataObj.length || 0,
//         _isEnd = false,
//         _callback;

//     var ss = function(){
//         var s = _max - _cur;
//         while(s--){
//             if( !_dataObj.length ){
//                 _isEnd = true;
//                 break;
//             }
//             var surl = _dataObj.shift();
//             _cur++;

//             _callback(surl);
//         }
//     }

//     this.start = function(callback){
//         _callback = callback;

//         ss();
//     },

//     this.call = function(){
//         if( !_isEnd ){
//             _cur--;
//             ss();
//         }
//     }
// }

// var dis = new Dispatch(urls, max);
// dis.start(getData);


var max = 3;
for(var i=1; i<=max; i++){

    getData(i);
}