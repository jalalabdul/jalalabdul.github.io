// Dark mode function
this.toggleDarkLight = function () {
  $("body").toggleClass("dark-mode light-mode");
};

// Scroll to top
this.srollToTop = function () {
    TweenLite.to(window, .9, {
      scrollTo: {
          y: 0,
          autoKill: !1
      },
      ease: Expo.easeInOut
  })
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
      $(this.oldContainer).removeClass("anim-in").fadeOut(200);
      $("footer").fadeOut(200);

      srollToTop();
    },

    fadeIn: function () {
      $("footer").fadeIn(200);
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
  $('.top-button').on('click', function () {
    srollToTop();
  });
});

// Google Analytics
Barba.Dispatcher.on('initStateChange', function () {
  if (typeof ga === 'function') {
    ga('send', 'pageview', location.pathname);
  };
});