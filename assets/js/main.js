// Dark mode function
this.toggleDarkLight = function () {
  $("body").toggleClass("dark-mode light-mode");
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

      $("html, body").stop(true, false).animate({
        scrollTop: 0
      }, 600);

      return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
          resolve();
        }, 400);
      });
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
    $("html, body").stop(true, false).animate({
      scrollTop: 0
    }, 600, 'swing');
  });
});

// Google Analytics
Barba.Dispatcher.on('initStateChange', function () {
  if (typeof ga === 'function') {
    ga('send', 'pageview', location.pathname);
  };
});