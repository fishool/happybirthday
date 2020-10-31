// load dependencies
var animationControl = require('./animation-control.js');
var bgMusic = $('audio').get(0);
var $btnMusic = $('.btn-music');
var $upArrow = $('.up-arrow');

(function () {
    'use strict';

    $(document).ready(function () {


        // background music control
        $btnMusic.click(function () {
            if (bgMusic.paused) {
                bgMusic.play();
                $(this).removeClass('paused');
            } else {
                bgMusic.pause();
                $(this).addClass('paused');
            }
        });


        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp();
    });
})();




/**************************
 COUNTDOWN COMPONENT
 **************************/
Vue.component('countdown', {
    template: `
  <section class="countdown">

    <div v-show="!expired" class="timer">
      <div class="box">
        <div class="spacer"></div>
        <p class="value">{{ days }}</p>
        <p class="label">days</p>
      </div>
      <div class="box">
        <div class="spacer"></div>
        <p class="value">{{ hours }}</p>
        <p class="label">hours</p>
      </div>
      <div class="box">
        <div class="spacer"></div>
        <p class="value">{{ minutes }}</p>
        <p class="label">minutes</p>
      </div>
      <div class="box">
        <div class="spacer"></div>
        <p class="value">{{ seconds }}</p>
        <p class="label">seconds</p>
      </div>
      <p class="text">~༺ 与 你 相 遇 ༻~</p>
    </div>

    <div v-show="expired" class="expired-timer timer">
      <div class="box">
        <div class="spacer"></div>
        <p class="value">情以彼生，初不相离。</p>
        <p class="value">旦逢良辰，顺颂时宜。</p>
        <p class="value">生老贫富，及尔偕依。</p>
        <p class="value">德音莫违，黾勉同息。</p>
        <p class="label">~ʚ 此情可待 ɞ~</p>
      </div>
    </div>

  </section>
`,

    data() {
        return {
            // deadline: 'Nov 17, 2020 00:00:00',
            deadline: 'Nov 17, 2019 00:00:00',
            days: '神',
            hours: '秘',
            minutes: '礼',
            seconds: '物!',
            expired: false
        };
    },
    created() {
        var ctx = this,
            countDownDate = new Date(ctx.deadline).getTime();
        let firstInit = true;

        // Countdown loop
        const clear = setInterval(function() {

            // Difference between the 2 dates
            var countDownDate = new Date(ctx.deadline).getTime(),
                now = new Date().getTime(),
                diff = countDownDate - now,

                // Time conversion to days, hours, minutes and seconds
                tdays = Math.floor(diff / (1000 * 60 * 60 * 24)),
                thours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                tseconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Keep 2 digits
            ctx.days = (tdays < 10) ? '0' + tdays : tdays;
            ctx.hours = (thours < 10) ? '0' + thours : thours;
            ctx.minutes = (tminutes < 10) ? '0' + tminutes : tminutes;
            ctx.seconds = (tseconds < 10) ? '0' + tseconds : tseconds;

            // Check for time expiration
            if (diff < 0) {
                clearInterval(clear);
                ctx.expired = true;
                // init Swiper
                new Swiper('.swiper-container', {
                    mousewheelControl: true,
                    effect: 'fade',    // slide, fade, coverflow or flip
                    fadeEffect: {
                        crossFade: true
                    },
                    speed: 600,
                    direction: 'vertical',
                    fade: {
                        crossFade: false
                    },
                    coverflow: {
                        rotate: 100,
                        stretch: 0,
                        depth: 300,
                        modifier: 1,
                        slideShadows: false     // do disable shadows for better performance
                    },
                    flip: {
                        limitRotation: true,
                        slideShadows: false     // do disable shadows for better performance
                    },
                    onInit: function (swiper) {
                        animationControl.initAnimationItems();  // get items ready for animations
                        animationControl.playAnimation(swiper); // play animations of the first slide
                    },
                    onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
                        if (swiper.activeIndex === swiper.slides.length - 1) {
                            $upArrow.hide();
                        } else {
                            $upArrow.show();
                        }
                    },
                    onTransitionEnd: function (swiper) {       // play animations of the current slide
                        animationControl.playAnimation(swiper);
                    },
                    onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
                        if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                            bgMusic.play();
                        }
                    }

                });

                $("title").html("臭臭生日快乐~");
                $("#gift").addClass("gift-open") .removeClass("gift")
            }
        }, 1000);
    }
});



/**************************
 ROOT COMPONENT
 **************************/
var app = new Vue({
    el: '#app'
});
