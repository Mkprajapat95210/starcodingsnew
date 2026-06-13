$(document).ready(function () {
    "use strict";

    // Select the water element
    var $water = $(".scrollToTop .water");

    // Function to update the progress path based on scroll
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      
      if (height <= 0) return;
      
      // Calculate progress percentage (0 to 100)
      var progressPercentage = Math.min(100, Math.max(0, (scroll / height) * 100));
      
      // Water starts at translateY(100%) and goes to translateY(0%)
      var translateYValue = 100 - progressPercentage;
      
      if ($water.length) {
          $water.css({
              "transform": "translateY(" + translateYValue + "%)",
              "transition": "none" // Remove CSS transition during scroll for smoother JS sync
          });
      }
    };

    // Initial update
    updateProgress();

    // Update progress on scroll
    $(window).scroll(updateProgress);

    // Offset and duration for scroll-to-top button
    var offset = 50;
    var duration = 550;

    // Show or hide the progress wrap based on scroll position
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > offset) {
        $(".scrollToTop").addClass("active-progress");
        $(".tmp-ready-chat").addClass("chat-visible");
      } else {
        $(".scrollToTop").removeClass("active-progress");
        $(".tmp-ready-chat").removeClass("chat-visible");
      }
    });

    // Scroll to top on progress wrap click
    $(".scrollToTop").on("click", function (event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
});