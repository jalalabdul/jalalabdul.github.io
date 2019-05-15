// URL preview script
// this.screenshotPreview = function(){	
// 		xOffset = 70;
// 		yOffset = -70;
// 	$(".post-link").hover(function(e){
// 		$(".post-link").addClass("hover");
// 		$(this).siblings()
// 			.css("display","block");
//     },
// 	function(){
// 		$(".post-link").removeClass("hover");
// 		$(this).siblings()
// 			.css("display","none");
//     });	
// 	$(".post-link").mousemove(function(e){
// 		$(this).prev()
// 			.css({'webkit-transform': 'translateX(' + (e.pageX - xOffset) + 'px) translateY(' + (e.pageY - xOffset) + 'px)', 'transform': 'translateX(' + (e.pageX - xOffset) + 'px) translateY(' + (e.pageY - xOffset) + 'px)'});
// 	});			
// };

this.screenshotPreview=function(){
	xOffset=70;
	yOffset=-70;
	$(".post-links").hover(function(e){
		$(".post-link").addClass("hover");
		$(".barba-container").append("<div id='screenshot'><img src='"+this.rel+"' alt='' /></div>");
		$("#screenshot").css("top",(e.pageY-xOffset)+"px").css("left",(e.pageX+yOffset)+"px").stop().fadeIn("fast")},
		function(){
		$(".post-link").removeClass("hover");
		$("#screenshot").remove()});
	$(".post-link").mousemove(function(e){$("#screenshot")
		.css("top",(e.pageY-xOffset)+"px").css("left",(e.pageX+yOffset)+"px")})
	};

// Viewport sizing fix
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Dark mode function
this.toggleDarkLight = function(){
  $("body").toggleClass("dark-mode light-mode");
};

document.addEventListener("DOMContentLoaded", function() {
	Barba.Pjax.init();
	var transEffect = Barba.BaseTransition.extend({
		start: function(){
			this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
		},
		fadeInNewcontent: function(nc) {
			$("html, body").animate({ scrollTop: 0 }, 600);
			nc.hide();
			var _this = this;
			$(this.oldContainer).fadeOut(100).promise().done(() => {
				nc.css('visibility','visible');
				nc.fadeIn(200, function(){
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
	$('.top-button').on('click',function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
	});
	// Toggle sidebar menu
	$('.page-link').on('click',function(){
		$('.nav-trigger').prop('checked',false);
	});
	if ( $(window).width() < 769) {
		$('button.logo').on('click',function(){
			$('.nav-trigger').prop('checked',false);
		});
	};
});

Barba.Dispatcher.on('initStateChange', function() {
	if (typeof ga === 'function') {
	  ga('send', 'pageview', location.pathname);
	}
});