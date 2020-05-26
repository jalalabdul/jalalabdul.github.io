// Screensaver
this.screensaver = function () {
var s_saver;
$('body').mousemove(function() {
    clearTimeout(s_saver);
    
    s_saver = setTimeout(function(){
        $('#screensaver').fadeIn(900);
    }, 30000);
    
    $('#screensaver').fadeOut(500);
});
};

// Scroll to top
this.srollToTop = function () {
  var dist = jQuery(window).scrollTop();
  if (dist > 1800) {
    TweenLite.to(window, 1, {
      scrollTo: {
        y: 0,
        autoKill: false
      },
      ease: Expo.easeInOut
    })
  } else {
    TweenLite.to(window, .8, {
      scrollTo: {
        y: 0,
        autoKill: false
      },
      ease: Power2.easeOut
    })
  }
};

// Barba.js
document.addEventListener("DOMContentLoaded", function () {
  var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function () {
      $(this.oldContainer).removeClass("anim-in").fadeOut(300);
      $("footer").fadeOut(300);

      srollToTop();

      return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
          resolve();
        }, 800);
      });
    },

    fadeIn: function () {
      $("footer").fadeIn(300);
      $(this.newContainer).addClass("anim-in");
      this.done();
    }
  });

  Barba.Pjax.getTransition = function () {
    return FadeTransition;
  };

  Barba.Pjax.start();
});

Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, rawHTML) {
  window.lazySizes.init();

  history.scrollRestoration = 'manual';
  $('.top-button').on('click', function () {
    srollToTop();
  });

  // Toggle sidebar menu
  $('.site-nav-link').on('click', function () {
    $('.nav-trigger').prop('checked', false);
  });
  if ($(window).width() < 769) {
    $('.switch').on('click', function () {
      $('.nav-trigger').prop('checked', false);
    });
  };

  // Screensaver
  if ($(window).width() > 1280) {
  screensaver();
  };
});

// Google Analytics
Barba.Dispatcher.on('initStateChange', function () {
  if (typeof ga === 'function') {
    ga('send', 'pageview', location.pathname);
  };
});
