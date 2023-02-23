var request = require('request'),
	cheerio = require('cheerio');

request('https://coding.imooc.com/?c=fe', function(err, response, body){
    if( !err && response.statusCode == 200 ){
    	// body为源码
    	// 使用 cheerio.load 将字符串转换为 cheerio(jQuery) 对象，
    	// 按照jQuery方式操作即可
        var $ = cheerio.load(body);
		
		// 输出导航的html代码
    var data = [];
    $('.course-list .course-card').each(function(){
        var $this = $(this);
  
    // 使用trim去掉数据两端的空格
        data.push({
            title : trim($this.find('.title').html()),
            url : trim('"https://coding.imooc.com' + $this.find('a').attr('href') + '"'),
        })
    });
    // console.log( JSON.stringify(data, ' ', 4) );
    console.log(data);

    }
});


// 删除字符串左右两端的空格
function trim(str){ 
  return str.replace(/(^\s*)|(\s*$)/g, "");
}