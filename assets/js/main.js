// URL preview script
this.screenshotPreview = function(){	
	/* CONFIG */
		
		xOffset = 75;
		yOffset = -75;
		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
		
	/* END CONFIG */
	$("a.post-link").hover(function(e){
		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$(".ajax").append("<p id='screenshot' class='lazyload'><img src='"+ this.rel +"' alt='url preview' />"+ c +"</p>");								 
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
		

// Starting scripts on page load
$(document).ready(function(){

$(".lazyload").Lazy({effect:"fadeIn",effectTime:500});

// start URL preview script
if ( $(window).width() > 769) {
	screenshotPreview();
};
	
// Toggle sidebar menu
	$('.page-link').on('click',function(){
            $('.nav-trigger').prop('checked',false);
	});

// Active menu
if ( $(window).width() > 769) {
	$('.site-header a').click(function(){
		$('.site-header a').removeClass("active");
		$(this).addClass("active");
	});
};


// Ajax
    var siteUrl = 'http://'+(document.location.hostname||document.location.host);

    // Make sure that all clicked links that link to your internal website
    // don't just reload the page but execute a History.pushState call
    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, 500);
		History.pushState({}, "", this.pathname);
	});

    // Catch all History stateChange events
    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();

        // Load the new state's URL via an Ajax Call
        $.get(State.url, function(data){
            // Replace the "<title>" tag's content
			//document.title = $(data).find("title").text();
			document.title = "Jalal Abdul Aziz";

            // Replace the content of the main container
            // If you're using another div, you should change the selector
			$('.page-content').html($(data).find('.ajax'));

			// Run URL preview script
			screenshotPreview();
			
			$(".lazyload").Lazy({effect:"fadeIn",effectTime:400});

			// Google Analytics
			ga('send', 'pageview', {
				'page': State.url,
				'title': document.title
			});
        });
    });
});