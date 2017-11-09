/*
 * Url preview script 
 * powered by jQuery (http://www.jquery.com)
 * 
 * written by Alen Grakalic (http://cssglobe.com)
 * 
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */
 
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
		$("body").append("<p id='screenshot'><img src='"+ this.rel +"' alt='url preview' />"+ c +"</p>");								 
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

// starting the script on page load
$(document).ready(function(){
	screenshotPreview();
	$('.ajax').delay(200).animate({opacity:'1'}, 800, 'swing');
	$('.page-link').on('click',function(){
            $('.nav-trigger').prop('checked',false);
    });
});


jQuery(document).ready(function($) {
    var siteUrl = 'http://'+(document.location.hostname||document.location.host);

    // Make sure that all clicked links that link to your internal website
    // don't just reload the page but execute a History.pushState call
    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
        e.preventDefault();
		History.pushState({}, "", this.pathname);
	});

    // Catch all History stateChange events
    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();

        // Load the new state's URL via an Ajax Call
        $.get(State.url, function(data){
            // Replace the "<title>" tag's content
			document.title = $(data).find("title").text();

            // Replace the content of the main container (.content)
            // If you're using another div, you should change the selector
			$('.page-content').html($(data).find('.ajax'));

			$('.ajax').delay(300).animate({opacity:'1'}, 400, 'linear');

            // If you're using Google analytics, make sure the pageview is registered!
			_gaq.push(['_trackPageview', State.url]);
        });
    });
});