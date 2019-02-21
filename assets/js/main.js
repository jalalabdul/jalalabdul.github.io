// URL preview script
this.screenshotPreview = function(){	
		
		xOffset = 95;
		yOffset = -95;
		
	$(".post-link").hover(function(e){						 
		$(this).siblings()
			.css("opacity","1");
    },
	function(){
		$(this).siblings()
			.css("opacity","0");
    });	
	$(".post-link").mousemove(function(e){
		$(".post-link-img-container")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
};

document.addEventListener("DOMContentLoaded", function() {
	Barba.Pjax.init();
  Barba.Prefetch.init();

	var transEffect = Barba.BaseTransition.extend({
		start: function(){
			$(window).scrollTop(0);
			this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
		},
		fadeInNewcontent: function(nc) {
			nc.hide();
			var _this = this;
			$(this.oldContainer).fadeOut(300).promise().done(() => {
				nc.css('visibility','visible');
				nc.fadeIn(300, function(){
					_this.done();
				})
			});
		}
});
Barba.Pjax.getTransition = function() {
	return transEffect;
}

  Barba.Pjax.start();
});

Barba.Dispatcher.on('newPageReady', function(e) {
	window.lazySizes.init();
	// Start screenshotPreview
	if ( $(window).width() > 769) {
		screenshotPreview();
	};
	// Toggle sidebar menu
	$('.page-link').on('click',function(){
		$('.nav-trigger').prop('checked',false);
	});
});

Barba.Dispatcher.on('initStateChange', function() {
	if (typeof ga === 'function') {
	  ga('send', 'pageview', location.pathname);
	}
});