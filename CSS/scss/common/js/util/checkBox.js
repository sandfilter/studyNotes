define(['jquery'], function ($) {
	var CheckBox = {
		//全选/取消attr为全选选择器
		selectAll : function(attrAll){
			attrAll.on("click",function(){
				if($(this).prop("checked")){
					$(this).parents('table').find(":checkbox").prop("checked", true);
				}else{
					$(this).parents('table').find(":checkbox").prop("checked", false);
				}
			});
		}
	};
		
    return CheckBox;
});