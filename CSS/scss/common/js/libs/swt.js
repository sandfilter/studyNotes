var swt_talk = 'http://webchart.gbicom.cn/LR/Chatpre.aspx?id=KJI83683011&lng=cn';
var swt_domain = location.hostname;
swt_talk = swt_talk + '&e=' + swt_domain;
function swt(){
	var swtRihgtTop = (window.screen.availHeight - 30 - 520) / 2;
	var swtCenterLeft = (window.screen.availWidth - 10 - 360) / 2;
	var LocationHref=location.href;
	if(swt_domain == 'a.gbicom.cn' || swt_domain == 'pinpaizhan.gbicom.cn'){
		swt_domain = 'A';
	}else if(swt_domain == 'aj.gbicom.cn'){
		swt_domain = 'aj';
	}else if(swt_domain == 'bq.gbicom.cn'|| swt_domain == 'bq.ipr123.com'){
		swt_domain = 'bq';
	}else if(swt_domain == 'g.gbicom.cn' || swt_domain == 'global.gbicom.cn'|| swt_domain == 'g.ipr123.com'){
		swt_domain = 'g';
	}else if(swt_domain == 'www.gbicom.cn'){
		swt_domain = 'gbicom';
	}else if(swt_domain == 'v.ipr123.com' || swt_domain == 'vip.gbicom.cn' || swt_domain == 'qa.gbicom.cn'){
		swt_domain = 'vip';
	}else if(swt_domain == 'www.ipr123.com'){
		swt_domain = 'ipr123';
	}else if(swt_domain == 'zl.gbicom.cn' || swt_domain == 'www.ciprun.cn' || swt_domain == 'zl.ipr123.com' || swt_domain == 'zlzr.gbicom.cn'){
		swt_domain = 'zl';
	}else if(swt_domain == 'pg.gbicom.cn' || swt_domain == 'pinggu.gbicom.cn'){
		swt_domain = 'pg';
	}else if(swt_domain=='pj.gbicom.cn' || swt_domain=='pj.ipr123.com'){
		if(LocationHref.indexOf('r.html')>0){
			swt_domain = 'vip';
		}else if(LocationHref.indexOf('c.html')>0){
			swt_domain = 'bq';
		}else if(LocationHref.indexOf('p.html')>0){
			swt_domain = 'zl';
		}else if(LocationHref.indexOf('g.html')>0){
			swt_domain = 'g';
		}else{
			swt_domain = 'gbicom';
		}
	}else if(swt_domain=='jg.gbicom.cn' || swt_domain=='jg.ipr123.com'){
		if(LocationHref.indexOf('r.html')>0){
			swt_domain = 'vip';
		}else if(LocationHref.indexOf('c.html')>0){
			swt_domain = 'bq';
		}else if(LocationHref.indexOf('p.html')>0){
			swt_domain = 'zl';
		}else if(LocationHref.indexOf('g.html')>0){
			swt_domain = 'g';
		}else{
			swt_domain = 'gbicom';
		}
	}else if(swt_domain=='ll.gbicom.cn' || swt_domain=='ll.ipr123.com'){
		if(LocationHref.indexOf('r.html')>0){
			swt_domain = 'vip';
		}else{
			swt_domain = 'gbicom';
		}
	}else if(swt_domain == 'qa.gbicom.cn' || swt_domain == 'qa.ipr123.com'){
		swt_domain = 'gbicom';
	}else{
		swt_domain = 'gbicom';
	}
	var swt_libs = 'http://libs.gbicom.cn/swt/';
	var swt_rightImg 		= swt_libs + swt_domain +'/rightShow.gif';
	var swt_centerImg 	= swt_libs + swt_domain +'/centerShow.png';
	var swt_closeBar 		= swt_libs + swt_domain +'/closeBar.png';
	swtRihgtTop = swtRihgtTop + 'px';
	swtCenterLeft = swtCenterLeft + 'px';
	var swtRight = '<div class="swt_fk" style="z-index:9999;position:fixed;right:1px;top:'+swtRihgtTop+';"><img src="'+ swt_rightImg +'" width="157" height="363" usemap="#Map199" border="0"><map name="Map199" id="Map199"><area shape="rect" coords="37,184,143,221" href="javascript:void(0);" onclick="openzx()" "><area shape="rect" coords="37,223,143,260" href="javascript:void(0);" onclick="openzx()" "><area shape="rect" coords="38,265,144,302" href="javascript:void(0);" onclick="openzx()" "><area shape="rect" coords="37,140,143,177" href="javascript:void(0);" onclick="openzx()" "><area shape="rect" coords="38,100,144,137" href="javascript:void(0);" onclick="openzx()"><area shape="rect" coords="0,128,28,219" href="javascript:void(0);" onclick="closeckrt();"></map></div>';
	var swt_rightbar = '<div class="swt_rightbar" style="display:none;z-index:9999;cursor: pointer"><img src="'+ swt_closeBar +'" style="position:fixed;right: 1px;top:320px;" /></div>';
	$('body').append(swtRight+swt_rightbar);
	$('.swt_rightbar').on('click',function(){
		$('.swt_rightbar').hide();
		$('.swt_fk').fadeIn();
	});
}
swt();
function openzx(){
	var iTop = (window.screen.availHeight - 30 - 600) / 2;
	var iLeft = (window.screen.availWidth - 10 - 800) / 2;
	window.open(swt_talk, 'newwindow', 'height=515, width=700,toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no,top=' + iTop + ',left=' + iLeft);
}
function closeck(){
	$('.tmiddle').hide();
	setCookie('swtCenterIsShow', 0);
}
function closeckrt(){
	$('.swt_fk').hide();
	$('.swt_rightbar').fadeIn();
}
function getCookie(c_name){
    if (document.cookie.length>0){
      c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1){ 
    	  	c_start=c_start + c_name.length+1 ;
    	  	c_end=document.cookie.indexOf(";",c_start);
    	  	if (c_end==-1)c_end=document.cookie.length;
    	  	return unescape(document.cookie.substring(c_start,c_end));
        } 
      }
    return 1;
}
function setCookie(c_name,value){
		var expiredays = 1;
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString());
}

smallWin();
function smallWin(){
	var width = $(window).width();
	if (width <= '1366') {
		$('.swt_rightbar').show();
		$('.swt_fk').hide();
	};
}