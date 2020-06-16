define(['zepto', 'event', 'touch'], function () {
	var TabCutM = {
		/**
		 * 选项卡切换通过class控制显示
		 */
		tabCutOperate : function(tabItem, siblings, cur, sClass){
			tabItem.on('touchend', function(e) {
				e.preventDefault();
				var index=$(this).index(),
					sibling = $(this).parent().siblings(siblings);
				$(this).addClass(cur).siblings().removeClass(cur);
				sibling.length == 1 ? sibling.children().removeClass(sClass).eq(index).addClass(sClass) : sibling.removeClass(sClass).eq(index).addClass(sClass);
			});
		},
		/**
		 *选项卡切换通过 show()/hide()函数控制
		 */
		tabCutByNone : function(tabItem, siblings, cur){
			tabItem.on('touchend', function(e) {
				e.preventDefault();
				var index=$(this).index(),
					sibling = $(this).parent().siblings(siblings);
				$(this).addClass(cur).siblings().removeClass(cur);
				sibling.length == 1 ? sibling.children().hide().eq(index).show() : sibling.hide().eq(index).show();
			});
		}
	};
    return TabCutM;
});