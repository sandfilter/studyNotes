define(['jquery'], function ($) {
	var Marquee={
		marquee : function(opts,stopObj){
			stopObj.each(function(){
				var $marquee = $(this);//滚动元素容器
				var _scrollObj = $marquee.get(0);//滚动元素容器DOM
				var scrollW = $marquee.width();//滚动元素容器的宽度
				var scrollH = $marquee.height();//滚动元素容器的高度
				var $element = $marquee.children().first(); //滚动元素
				var $kids = $element.children();//滚动子元素
				var scrollSize=0;//滚动元素尺寸
				var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//滚动类型，1左右，0上下
				var scrollId, rollId, isMove, marqueeId;
				var t,b,c,d,e; //滚动动画的参数,t:当前时间，b:开始的位置，c:改变的位置，d:持续的时间，e:结束的位置
				var _size, _len; //子元素的尺寸与个数
				var arrPos = []; 
				var numView = 0; //当前所看子元素
				var numRoll=0; //轮换的次数
				var numMoved = 0;//已经移动的距离
				var $nav,$navBtns;
				if(opts.mode == 'fade'){
					$kids.css({
						'position': 'absolute',
						'left': 0,
						'top': 0
					}).first().siblings().hide();
					//轮换导航
					if (opts.navId) {
						$nav = $(opts.navId),$navBtns = $nav.children();
						opts.eventNav == 'hover' ? $navBtns.mouseover(function () {
							nstop();
							var index = $(this).index();
							play(index);
						}).mouseout(function () {
							opts.isAuto && nstart();
						}) : $navBtns.bind('click',function() {
							nstop();
							var index = $(this).index();
							play(index);
							opts.isAuto && nstart();
						});
						opts.isAuto && nstart();
					}
					if(opts.btnGo){
						$(opts.btnGo.left).bind('click', function(){
							//if(isMove == true) return;
							nstop();
							numView == $kids.length - 1 ? triggerPlay(-1) : triggerPlay(numView);
							opts.isAuto && nstart();
						});
						$(opts.btnGo.right).bind(opts.eventGo,function(){
							//if(isMove == true) return;
							nstop();
							numView == 0 ? triggerPlay($kids.length - 2) : triggerPlay(numView - 2);
							opts.isAuto && nstart();
						});
					}
				}else{
					//防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
					_size = $kids[_type?'outerWidth':'outerHeight']();
					_len = $kids.length;
					$element.css(_type?'width':'height',_size * _len);
					//获取滚动元素的尺寸
					if (opts.isEqual) {
						_size = $kids[_type?'outerWidth':'outerHeight']();
						_len = $kids.length;
						scrollSize = _size * _len;
						for(var i=0;i<_len;i++){
							arrPos.push(i*_size);
						}
					}else{
						$kids.each(function(i){
							arrPos.push(scrollSize);
							scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
						});
					}
					//滚动元素总尺寸小于容器尺寸，不滚动
					if (scrollSize<(_type?scrollW:scrollH)) return; 
					//克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
					$element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
					//轮换导航
					if (opts.navId) {
						$nav = $(opts.navId).hover( nstop, nstart );
						$navBtns = $nav.children();
						$navBtns.each(function(i){
							$(this).bind(opts.eventNav,function(){
								if(isMove) return;
								if(numView==i) return;
								rollFunc(arrPos[i]);
								$navBtns.eq(numView).removeClass(opts.cur);
								numView = i;
								$(this).addClass(opts.cur);
							});
						});
						
						$navBtns.eq(numView).addClass(opts.cur);
					}
					//设定初始位置
					if (opts.direction == 'right' || opts.direction == 'down') {
						_scrollObj[_type?'scrollLeft':'scrollTop'] = scrollSize;
					}else{
						_scrollObj[_type?'scrollLeft':'scrollTop'] = 0;
					}
					
					if(opts.isMarquee){
						//滚动开始
						marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
						//鼠标划过停止滚动
						$marquee.hover(
							function(){
								clearInterval(marqueeId);
							},
							function(){
								clearInterval(marqueeId);
								marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
							}
						);
					}else{
						if(opts.isAuto){
							//轮换开始
							nstart();
							//鼠标划过停止轮换
							$marquee.hover( nstop, nstart );
						}
						//控制前后走
						if(opts.btnGo){
							$.each(opts.btnGo, function(i,val){
								$(val).bind(opts.eventGo,function(){
									if(isMove == true) return;
									opts.direction = i;
									rollFunc();
									if (opts.isAuto) {
										nstop();
										nstart();
									}
								});
							});
						}
					}
				}
				
				function scrollFunc(){
					var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
					
					if(opts.isMarquee){
						if (opts.loop > 0) {
							numMoved+=opts.scrollAmount;
							if(numMoved>scrollSize*opts.loop){
								_scrollObj[_dir] = 0;
								return clearInterval(marqueeId);
							} 
						}
						var newPos = _scrollObj[_dir]+(opts.direction == 'left' || opts.direction == 'up'?1:-1)*opts.scrollAmount;
					}else{
						if(opts.duration){
							if(t++<d){
								isMove = true;
								var newPos = Math.ceil(easeOutQuad(t,b,c,d));
								if(t==d){
									newPos = e;
								}
							}else{
								newPos = e;
								clearInterval(scrollId);
								isMove = false;
								return;
							}
						}else{
							var newPos = e;
							clearInterval(scrollId);
						}
					}
					
					if(opts.direction == 'left' || opts.direction == 'up'){
						if(newPos>=scrollSize){
							newPos-=scrollSize;
						}
					}else{
						if(newPos<=0){
							newPos+=scrollSize;
						}
					}
					_scrollObj[_dir] = newPos;
					
					if(opts.isMarquee){
						marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
					}else if(t<d){
						if(scrollId) clearTimeout(scrollId);
						scrollId = setTimeout(scrollFunc, opts.scrollDelay);
					}else{
						isMove = false;
					}
					
				};
				
				function rollFunc(pPos){
					isMove = true;
					var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
					var _neg = opts.direction == 'left' || opts.direction == 'up'?1:-1;
					
					numRoll = numRoll +_neg;
					//得到当前所看元素序号并改变导航CSS
					if(pPos == undefined&&opts.navId){
						$navBtns.eq(numView).removeClass(opts.cur);
						numView +=_neg;
						if(numView>=_len){
							numView = 0;
						}else if(numView<0){
							numView = _len-1;
						}
						$navBtns.eq(numView).addClass(opts.cur);
						numRoll = numView;
					}
					var _temp = numRoll<0?scrollSize:0;
					t=0;
					b=_scrollObj[_dir];
					e=(pPos != undefined)?pPos:_temp+(opts.distance*numRoll)%scrollSize;
					if(_neg==1){
						if(e>b){
							c = e-b;
						}else{
							c = e+scrollSize -b;
						}
					}else{
						if(e>b){
							c =e-scrollSize-b;
						}else{
							c = e-b;
						}
					}
					d=opts.duration;
					
					if(scrollId) clearTimeout(scrollId);
					scrollId = setTimeout(scrollFunc, opts.scrollDelay);
					
				}
				
				function nstart(){
					rollId = opts.mode == 'slide' ? setInterval(function(){
							rollFunc();
						}, opts.time*1000) : setInterval(function(){
							triggerPlay(numView);
						}, opts.time*1000);
					
				}
				function nstop(){
					clearInterval(rollId);
				}
				
				function easeOutQuad(t,b,c,d){
					return -c *(t/=d)*(t-2) + b;
				}
		
				//trigger play
				function triggerPlay(cIndex) {
					var index;
					(cIndex == $kids.length - 1) ? index = 0 : index = cIndex + 1;
					play(index);
					
				}
		
				//play
				function play(index) {
					$element.stop(true, true);
            		$kids.stop(true, true);
					
					if ($element.children(':visible').index() == index) return;
					$element.children().fadeOut(opts.scrollDelay).eq(index).fadeIn(opts.scrollDelay*2);
		
					try {
						$navBtns.removeClass(opts.cur);
						$navBtns.eq(index).addClass(opts.cur);
					} catch (e) { }
		
					numView = index;
				}
				
			});
		}
	}
	return Marquee;
});