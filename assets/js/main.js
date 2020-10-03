// Screensaver
this.screensaver = function () {
  var s_saver;
  $('body').mousemove(function () {
    clearTimeout(s_saver);

    s_saver = setTimeout(function () {
      $('#screensaver').fadeIn(900);
    }, 40000);

    $('#screensaver').fadeOut(500);
  });
};


// Swiper
this.swiper = function () {
var swiper = new Swiper('.swiper-container', {
  autoHeight: true,
  loop: true,
  autoplay: {
    delay: 4000,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
};

// Header Animation
this.headerAnimation = function () {
  var header = document.querySelector(".site-header");
  var headroom = new Headroom(header, {
    tolerance: {
      down: 10,
      up: 20
    },
    offset: 15,
  });
  headroom.init();
};

// Mobile menu toggle
this.mobileToggle = function () {
  $('.nav-trigger').change(function () {
    var c = this.checked ? 'Close' : 'Menu';
    $('.open').text(c);
  });
  $('.site-nav-link').on('click', function () {
    $('label[for="nav-trigger"]').click();
    $('.nav-trigger').prop('checked', false);
    $('.open').attr('value', doc_val_check);
  });
};

// Time
function updateClock() {
  var e = new Date,
    t = e.getHours(),
    n = e.getMinutes(),
    o = e.getSeconds();
  n = (n < 10 ? "0" : "") + n, o = (o < 10 ? "0" : "") + o;
  var u = t < 12 ? "AM" : "PM";
  t = t > 12 ? t - 12 : t, t = 0 == t ? 12 : t;
  var c = t + ":" + n + ":" + o + " " + u;
  $(".time").text(toTimeZone(c, "Asia/Makassar"));
}

function toTimeZone(e, t) {
  var n = "hh:mm A";
  return moment(e, n).tz(t).format(n)
}

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


  headerAnimation();
  mobileToggle();
  // swiper();


  if ($(window).width() > 769) {
    // Screensaver
    screensaver();
    window.setInterval(function () {
      updateClock();
    }, 1000);
  };
});

// Google Analytics
Barba.Dispatcher.on('initStateChange', function () {
  if (typeof ga === 'function') {
    ga('send', 'pageview', location.pathname);
  };
});
