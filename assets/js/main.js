// Dark mode function
this.toggleDarkLight = function () {
  $("body").toggleClass("dark-mode light-mode");
};

document.addEventListener("DOMContentLoaded", function () {
  Barba.Pjax.init();
  var transEffect = Barba.BaseTransition.extend({
    start: function () {
      this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
    },
    fadeInNewcontent: function (nc) {
      $("html, body").stop(true, false).animate({
        scrollTop: 0
      }, 600);
      nc.hide();
      var _this = this;
      $(this.oldContainer).fadeOut(100).promise().done(() => {
        nc.css('visibility', 'visible');
        nc.fadeIn(200, function () {
          _this.done();
        })
      });
    }
  });
  Barba.Pjax.getTransition = function () {
    return transEffect;
  }
  Barba.Pjax.start();
});

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, rawHTML) {
  window.lazySizes.init();
  $('.top-button').on('click', function () {
    $("html, body").stop(true, false).animate({
      scrollTop: 0
    }, 600);
  });
  // Toggle sidebar menu
  $('.site-nav-link').on('click', function () {
    $('.nav-trigger').prop('checked', false);
  });
  if ($(window).width() < 769) {
    $('button.logo').on('click', function () {
      $('.nav-trigger').prop('checked', false);
    });
  };
});

Barba.Dispatcher.on('initStateChange', function () {
  if (typeof ga === 'function') {
    ga('send', 'pageview', location.pathname);
  };
});