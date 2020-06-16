define(['zepto', 'event', 'touch'], function () {
	var uploadM = {
		prewImg : function(file, mainbox){
			var imgObjPreview=mainbox.find('img')[0];
			if(file.files &&file.files[0]){
				if(window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1){
					imgObjPreview.src = window.webkitURL.createObjectURL(file.files[0]);
				}else{
					imgObjPreview.src = window.URL.createObjectURL(file.files[0]);
				}
			}
		}
	};
	return uploadM;
});