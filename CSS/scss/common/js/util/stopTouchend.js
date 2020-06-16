define(['zepto', 'event', 'touch'], function(){
	var stopTouchend = {
        locked: false,
		stopTouchendPropagationAfterScroll: function(){
            var self = this;
            window.addEventListener('touchmove', function(ev){
                self.locked || (self.locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
            }, true);
            function stopTouchendPropagation(ev){
                ev.stopPropagation();
                window.removeEventListener('touchend', stopTouchendPropagation, true);
                self.locked = false;
            }
        },
        stopTouchendPropagation: function(){
        	var self = this;
        	$(window).scroll(function() {
				self.stopTouchendPropagationAfterScroll();
        	});
        }
	};
	return stopTouchend;
});