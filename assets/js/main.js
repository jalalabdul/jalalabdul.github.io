// URL preview script
this.screenshotPreview = function(){	
		
		xOffset = 95;
		yOffset = -95;
		
	$("a.post-link").hover(function(e){
		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$(".barba-container").prepend("<p id='screenshot' class='lazyload'><img src='"+ this.rel +"' alt='url preview' />"+ c +"</p>");								 
		$("#screenshot")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");						
    },
	function(){
		this.title = this.t;	
		$("#screenshot").remove();
    });	
	$("a.post-link").mousemove(function(e){
		$("#screenshot")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
};

document.addEventListener("DOMContentLoaded", function() {
	Barba.Pjax.init();
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