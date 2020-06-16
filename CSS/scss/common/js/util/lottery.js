define(['jquery'], function ($) {
	var lottery={
		index:-1,	//当前转动到哪个位置，起点位置
		count:0,	//总共有多少个位置
		timer:0,	//setTimeout的ID，用clearTimeout清除
		speed:20,	//初始转动速度
		times:0,	//转动次数
		cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
		prize:-1,	//中奖位置
		init:function(lot){
			if (lot.children().length) {
				units = lot.children();
				this.obj = lot;
				this.count = units.length;
				//lot.children().eq(this.index).addClass("cur");
			};
		},
		roll:function(){
			var index = this.index;
			var count = this.count;
			var lottery = this.obj;
			lottery.children().eq(index).removeClass("cur");
			index += 1;
			if (index>count-1) {
				index = 0;
			};
			lottery.children().eq(index).addClass("cur");
			this.index=index;
			return false;
		},
		stop:function(index){
			this.prize=index;
			return false;
		}
	};
	return lottery;
});