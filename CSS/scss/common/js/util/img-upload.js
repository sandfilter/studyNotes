define(['jquery','crop'], function ($) {
	/**
	 * 图片尺寸计算
	 * @param  {int} maxWidth  [图片宽度]
	 * @param  {int} maxHeight [图片高度]
	 * @param  {int} width     [盒子宽度]
	 * @param  {int} height    [盒子高度]
	 */
	function clacImgZoomParam( maxWidth, maxHeight, width, height ){
		var param = {top:0, left:0, width:width, height:height};
		if( width>maxWidth || height>maxHeight )
		{
			rateWidth = width / maxWidth;
			rateHeight = height / maxHeight;
	
			if( rateWidth > rateHeight )
			{
				param.width =  maxWidth;
				param.height = Math.round(height / rateWidth);
			}else
			{
				param.width = Math.round(width / rateHeight);
				param.height = maxHeight;
			}
		}
		param.left = Math.round((maxWidth - param.width) / 2);
		param.top = Math.round((maxHeight - param.height) / 2);
		return param;
	};
	var PrewImg = {
		/**
		 * 上传图片
		 * @param  {object}  file       [所上传的图片的文件对象]
		 * @param  {string}  mainbox    [图片盒子的ID]
		 * @param  {string}  preview    [预览对象的属性值]
		 * @param  {object}  image      [上传图片对象]
		 * @param  {Boolean} isCrop     [是否需要裁剪]
		 */
		prewimg_yang : function (file,mainbox,preview,image,isCrop){
			var localImagId = mainbox.get(0);
			var imgObjPreview=localImagId.getElementsByTagName('img')[0];
			var MAXWIDTH  = localImagId.offsetWidth;
			var MAXHEIGHT = localImagId.offsetHeight;
			if(file.files &&file.files[0]){
				imgObjPreview.onload = function(){
					var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, imgObjPreview.offsetWidth, imgObjPreview.offsetHeight);
					imgObjPreview.width  =  rect.width;
					imgObjPreview.height =  rect.height;
					imgObjPreview.style.marginTop = rect.top+'px';
				}
				if(window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1){
					imgObjPreview.src = window.webkitURL.createObjectURL(file.files[0]);
				}else{
					imgObjPreview.src = window.URL.createObjectURL(file.files[0]);
				}
				if (isCrop) {
					/**
					 * 图片裁剪
					 */
					// 初始化头像图片
					var $image = image,
						$dataX = $('#dataX'),
						$dataY = $('#dataY'),
						$dataHeight = $('#dataHeight'),
						$dataWidth = $('#dataWidth'),
						$dataRotate = $('#dataRotate'),
						options = {
						  aspectRatio: 1 / 1,
						  preview: preview,
						  crop: function (data) {
							$dataX.val(Math.round(data.x));
							$dataY.val(Math.round(data.y));
							$dataHeight.val(Math.round(data.height));
							$dataWidth.val(Math.round(data.width));
							$dataRotate.val(Math.round(data.rotate));
						  }
						};
				
					$image.on({
					  'build.cropper': function (e) {
						//console.log(e.type);
					  },
					  'built.cropper': function (e) {
						//console.log(e.type);
					  },
					  'dragstart.cropper': function (e) {
						//console.log(e.type, e.dragType);
					  },
					  'dragmove.cropper': function (e) {
						//console.log(e.type, e.dragType);
					  },
					  'dragend.cropper': function (e) {
						//console.log(e.type, e.dragType);
					  },
					  'zoomin.cropper': function (e) {
						//console.log(e.type);
					  },
					  'zoomout.cropper': function (e) {
						//console.log(e.type);
					  }
					}).cropper(options);
				
					// Methods
					$(document.body).on('click', '[data-method]', function () {
					  var data = $(this).data(),
						  $target,
						  result;
				
					  if (data.method) {
						data = $.extend({}, data); // Clone a new one
				
						if (typeof data.target !== 'undefined') {
						  $target = $(data.target);
				
						  if (typeof data.option === 'undefined') {
							try {
							  data.option = JSON.parse($target.val());
							} catch (e) {
							  console.log(e.message);
							}
						  }
						}
						result = $image.cropper(data.method, data.option);
						if (data.method === 'getCroppedCanvas') {
						  $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
						}
						if ($.isPlainObject(result) && $target) {
						  try {
							$target.val(JSON.stringify(result));
						  } catch (e) {
							console.log(e.message);
						  }
						}
					  }
					}).on('keydown', function (e) {
					    switch (e.which) {
							case 37:
							  e.preventDefault();
							  $image.cropper('move', -1, 0);
							  break;
							case 38:
							  e.preventDefault();
							  $image.cropper('move', 0, -1);
							  break;
							case 39:
							  e.preventDefault();
							  $image.cropper('move', 1, 0);
							  break;
							case 40:
							  e.preventDefault();
							  $image.cropper('move', 0, 1);
							  break;
					    }
					});
				}
			}else{
				//IE下，使用滤镜
				file.select();
				var imgSrc = document.selection.createRange().text;
				if(imgSrc){
					var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, imgObjPreview.offsetWidth, imgObjPreview.offsetHeight);
					imgObjPreview.width  =  rect.width;
					imgObjPreview.height =  rect.height;
					imgObjPreview.style.marginTop = rect.top+'px';
				}
				//图片异常的捕捉，防止用户修改后缀来伪造图片
				try{
					localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
					localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
				}catch(e){
					alert("您上传的图片格式不正确，请重新选择!");
					return false;
				}
				imgObjPreview.style.display = 'none';
				document.selection.empty();
			}
		}
	};
	return PrewImg;
});