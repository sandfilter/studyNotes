define(['jquery'], function ($) {
	var TxtInput = {
		IsBlank : function(attr,color1,color2){
			$.each($("input[type='text']"), function(index, val) {
				var txtAttr = $(this).attr(attr);
				if($(this).val() == '' || $(this).val() == txtAttr){
					$(this).val(txtAttr).css('color',color1);
				}else{
					$(this).css('color',color2);
				}
				$(this).on('blur',function(){
					var txtAttr = $(this).attr(attr);
					$(this).val()=='' || $(this).val()==txtAttr ? $(this).val(txtAttr).css('color',color1) : $(this).css('color',color2);
				}).on('focus',function(){
					var txtAttr = $(this).attr(attr);
					$(this).val()=='' || $(this).val()==txtAttr ? $(this).val('').css('color',color2) : $(this).css('color',color2);
				});
			});
			$.each($('textarea'), function(index, val) {
				var txtAttr = $(this).attr(attr);
				if($(this).val() == '' || $(this).val() == txtAttr){
					$(this).val(txtAttr).css('color',color1);
				}else{
					$(this).css('color',color2);
				}
				$(this).on('blur',function(){
					$(this).val()=='' || $(this).val()==txtAttr ? $(this).val(txtAttr).css('color',color1) : $(this).css('color',color2);
				}).on('focus',function(){
					$(this).val()=='' || $(this).val()==txtAttr ? $(this).val('').css('color',color2) : $(this).css('color',color2);
				});
			});
		},
		/**
		 * 纯数字验证
		 * @param  {[type]} inputObj [description]
		 * @return {[type]}          [description]
		 */
		numberValidate : function(inputObj){
			inputObj.on('keyup', function(event) {
				var c=$(this), reg = /[^\d]/g;
				if(/[^\d]/.test(c.val())){//替换非数字字符
					var temp_amount=c.val().replace(reg,'');
					$(this).val(temp_amount);
				}
			});
		},
		/**
		 * 纯手机号验证
		 * @param  {[type]} inputObj [description]
		 * @return {[type]}          [description]
		 */
		mobileValidate : function(inputObj){
			inputObj.on('keyup', function(event) {
				var c=$(this), reg = /\D|^0/g;
				if(/\D|^0/.test(c.val())){//替换非数字字符
					var temp_amount=c.val().replace(reg,'');
					$(this).val(temp_amount);
				}
			});
		},
		/**
		 * 数字+字母验证
		 * @param  {[type]} numObj [description]
		 * @return {[type]}          [description]
		 */
		numberOrLetterValidate : function(numObj){
			numObj.on('keyup', function(event) {
				var c=$(this), reg = /[^A-Za-z0-9]/g;
				if(/[^A-Za-z0-9]/.test(c.val())){//替换非数字字符
					var temp_amount=c.val().replace(reg,'');
					$(this).val(temp_amount);
				}
			});
		},
		/**
		 * 非汉字验证
		 * @param  {[type]} inputObj [description]
		 * @return {[type]}          [description]
		 */
		notCheneseValidate : function(inputObj){
			inputObj.on('keyup', function(event) {
				var c=$(this), reg = /[\u4E00-\u9FA5]/g;
				if(/[\u4e00-\u9fa5]/.test(c.val())){
					var temp_amount=c.val().replace(reg,'');
					$(this).val(temp_amount);
				}
			});
		},
		/**
		 * 纯汉字
		 * @param {[type]} inputObj [description]
		 */
		cheneseValidate: function(inputObj){
			inputObj.on('keyup', function(event) {
				var c=$(this), reg = /[^\u4e00-\u9fa5]/g;
				if(/[^\u4e00-\u9fa5]/.test(c.val())){
					var temp_amount=c.val().replace(reg,'');
					$(this).val(temp_amount);
				}
			});
		},
		/**
		 * 密码输入控制
		 * @param  {[type]} inputObj [description]
		 * @return {[type]}          [description]
		 */
		pwdValidate : function(inputObj){
			inputObj.on('keyup', function(event) {
				var c=$(this), reg = /[\u4E00-\u9FA5]/g;
				if(/[\u4e00-\u9fa5]/.test(c.val())){
					var temp_amount=c.val().replace(reg,'');
					$(this).val(temp_amount);
				}
			});
		},
		/**
		 * 非特殊字符控制
		 */
		searchValidate : function(inputObj){
			inputObj.on('keyup', function(event) {
				var c=$(this), temp = '';
			    temp = c.val().replace(/[^\u4E00-\u9FA5|a-zA-Z0-9]/g,'');
			    $(this).val(temp);
			})
		},
		/**
		 * 汉字+字母控制
		 */
		chineseOrLetter : function(inputObj){
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？|0-9]");
			inputObj.on('keyup', function(event) {
				var c=$(this), temp = '';
			    temp = c.val().replace(pattern,'');
			    $(this).val(temp);
			})
		},
		/**
		 * 清空表单
		 * @param  {[type]} pl  [description]
		 * @param  {[type]} errClass [description]
		 * @return {[type]}     [description]
		 */
		clearText : function(pl, errClass){
			pl.find('input[type=text]').each(function(index, el) {
				$(this).val($(this).attr('place')).removeClass('errClass').css('color', '#ccc');
			});
			pl.find('input[type=number]').each(function(index, el) {
				$(this).val($(this).attr('place')).removeClass('errClass').css('color', '#ccc');
			});
			pl.find('textarea').each(function(index, el) {
				$(this).val($(this).attr('place')).removeClass('errClass').css('color', '#ccc');
			});
		},
		clearInpText : function(pl, errClass){
			pl.find('input[type=text]').each(function(index, el) {
				$(this).val('').removeClass('errClass');
			});
			pl.find('input[type=number]').each(function(index, el) {
				$(this).val('').removeClass('errClass');
			});
			pl.find('textarea').each(function(index, el) {
				$(this).val('').removeClass('errClass');
			});
		}
	};
		
    return TxtInput;
});