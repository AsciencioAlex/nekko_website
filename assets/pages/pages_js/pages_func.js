// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

    // DOMMouseScroll included for firefox support
    var canScroll = true,
        scrollController = null;
    // $(this).on('mousewheel DOMMouseScroll', function(e){
  
    //   if (!($('.outer-nav').hasClass('is-vis'))) {
  
    //     e.preventDefault();
  
    //     var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;
  
    //     if (delta > 50 && canScroll) {
    //       canScroll = false;
    //       clearTimeout(scrollController);
    //       scrollController = setTimeout(function(){
    //         canScroll = true;
    //       }, 800);
    //       updateHelper(1);
    //     }
    //     else if (delta < -50 && canScroll) {
    //       canScroll = false;
    //       clearTimeout(scrollController);
    //       scrollController = setTimeout(function(){
    //         canScroll = true;
    //       }, 800);
    //       updateHelper(-1);
    //     }
  
    //   }
  
    // });
  
    $('.side-nav li, .outer-nav li').click(function(){
  
      if (!($(this).hasClass('is-active'))) {
  
        var $this = $(this),
            curActive = $this.parent().find('.is-active'),
            curPos = $this.parent().children().index(curActive),
            nextPos = $this.parent().children().index($this),
            lastItem = $(this).parent().children().length - 1;
  
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
  
      }
  
    });
  
    $('.cta').click(function(){
  
      var curActive = $('.side-nav').find('.is-active'),
          curPos = $('.side-nav').children().index(curActive),
          lastItem = $('.side-nav').children().length - 1,
          nextPos = lastItem;
  
      updateNavs(lastItem);
      updateContent(curPos, nextPos, lastItem);
  
    });
  
    // swipe support for touch devices
    var targetElement = document.getElementById('viewport'),
        mc = new Hammer(targetElement);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    mc.on('swipeup swipedown', function(e) {
  
      updateHelper(e);
  
    });
  
    $(document).keyup(function(e){
  
      if (!($('.outer-nav').hasClass('is-vis'))) {
        e.preventDefault();
        updateHelper(e);
      }
  
    });
  
    // determine scroll, swipe, and arrow key direction
    function updateHelper(param) {
  
      var curActive = $('.side-nav').find('.is-active'),
          curPos = $('.side-nav').children().index(curActive),
          lastItem = $('.side-nav').children().length - 1,
          nextPos = 0;
  
      if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
        if (curPos !== lastItem) {
          nextPos = curPos + 1;
          updateNavs(nextPos);
          updateContent(curPos, nextPos, lastItem);
        }
        else {
          updateNavs(nextPos);
          updateContent(curPos, nextPos, lastItem);
        }
      }
      else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
        if (curPos !== 0){
          nextPos = curPos - 1;
          updateNavs(nextPos);
          updateContent(curPos, nextPos, lastItem);
        }
        else {
          nextPos = lastItem;
          updateNavs(nextPos);
          updateContent(curPos, nextPos, lastItem);
        }
      }
  
    }
  
    // sync side and outer navigations
    function updateNavs(nextPos) {
  
      $('.side-nav, .outer-nav').children().removeClass('is-active');
      $('.side-nav').children().eq(nextPos).addClass('is-active');
      $('.outer-nav').children().eq(nextPos).addClass('is-active');
  
    }
  
    // update main content area
    function updateContent(curPos, nextPos, lastItem) {
  
      $('.main-content').children().removeClass('section--is-active');
      $('.main-content').children().eq(nextPos).addClass('section--is-active');
      $('.main-content .section').children().removeClass('section--next section--prev');
  
      if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
        $('.main-content .section').children().removeClass('section--next section--prev');
      }
      else if (curPos < nextPos) {
        $('.main-content').children().eq(curPos).children().addClass('section--next');
      }
      else {
        $('.main-content').children().eq(curPos).children().addClass('section--prev');
      }
  
      if (nextPos !== 0 && nextPos !== lastItem) {
        $('.header--cta').addClass('is-active');
      }
      else {
        $('.header--cta').removeClass('is-active');
      }
  
    }
  
    function outerNav() {
  
      $('.header--nav-toggle').click(function(){
  
        $('.perspective').addClass('perspective--modalview');
        setTimeout(function(){
          $('.perspective').addClass('effect-rotate-left--animate');
        }, 25);
        $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');
  
      });
  
      $('.outer-nav--return, .outer-nav li').click(function(){
  
        $('.perspective').removeClass('effect-rotate-left--animate');
        setTimeout(function(){
          $('.perspective').removeClass('perspective--modalview');
        }, 400);
        $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');
  
      });
  
    }
  
    function ourSolutionSlider() {
      $('.carousel-prev, .carousel-next').click(function() {
   
       var $this = $(this),
           curLeft = $('.carousel').find('.solution-item-left'),
           curLeftPos = $('.carousel').children().index(curLeft),
           curCenter = $('.carousel').find('.solution-item-center'),
           curCenterPos = $('.carousel').children().index(curCenter),
           curRight = $('.carousel').find('.solution-item-right'),
           curRightPos = $('.carousel').children().index(curRight),
           totalWorks = $('.carousel').children().length,
           $left = $('.solution-item-left'),
           $center = $('.solution-item-center'),
           $right = $('.solution-item-right'),
           $item = $('.solution-item');
   
       $('.carousel').animate({ opacity : 0 }, 400);
   
       setTimeout(function(){
   
       if ($this.hasClass('carousel-next')) {
         if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
           $left.removeClass('solution-item-left').next().addClass('solution-item-left');
           $center.removeClass('solution-item-center').next().addClass('solution-item-center');
           $right.removeClass('solution-item-right').next().addClass('solution-item-right');
         }
         else {
           if (curLeftPos === totalWorks - 1) {
             $item.removeClass('solution-item-left').first().addClass('solution-item-left');
             $center.removeClass('solution-item-center').next().addClass('solution-item-center');
             $right.removeClass('solution-item-right').next().addClass('solution-item-right');
           }
           else if (curCenterPos === totalWorks - 1) {
             $left.removeClass('solution-item-left').next().addClass('solution-item-left');
             $item.removeClass('solution-item-center').first().addClass('solution-item-center');
             $right.removeClass('solution-item-right').next().addClass('solution-item-right');
           }
           else {
             $left.removeClass('solution-item-left').next().addClass('solution-item-left');
             $center.removeClass('solution-item-center').next().addClass('solution-item-center');
             $item.removeClass('solution-item-right').first().addClass('solution-item-right');
           }
         }
       }
       else {
         if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
           $left.removeClass('solution-item-left').prev().addClass('solution-item-left');
           $center.removeClass('solution-item-center').prev().addClass('solution-item-center');
           $right.removeClass('solution-item-right').prev().addClass('solution-item-right');
         }
         else {
           if (curLeftPos === 0) {
             $item.removeClass('solution-item-left').last().addClass('solution-item-left');
             $center.removeClass('solution-item-center').prev().addClass('solution-item-center');
             $right.removeClass('solution-item-right').prev().addClass('solution-item-right');
           }
           else if (curCenterPos === 0) {
             $left.removeClass('solution-item-left').prev().addClass('solution-item-left');
             $item.removeClass('solution-item-center').last().addClass('solution-item-center');
             $right.removeClass('solution-item-right').prev().addClass('solution-item-right');
           }
           else {
             $left.removeClass('solution-item-left').prev().addClass('solution-item-left');
             $center.removeClass('solution-item-center').prev().addClass('solution-item-center');
             $item.removeClass('solution-item-right').last().addClass('solution-item-right');
           }
         }
       }
   
     }, 400);
   
     $('.carousel').animate({ opacity : 1 }, 400);
   
     });
   
   }
    
    
    
   function workSlider() {
    // Function to handle slider navigation for a specific slider
    function handleSliderNavigation(sliderClass) {
      $(`.${sliderClass} .slider--prev, .${sliderClass} .slider--next`).click(function() {
        var $this = $(this),
            $slider = $(`.${sliderClass}`),
            curLeft = $slider.find('.slider--item-left'),
            curLeftPos = $slider.children().index(curLeft),
            curCenter = $slider.find('.slider--item-center'),
            curCenterPos = $slider.children().index(curCenter),
            curRight = $slider.find('.slider--item-right'),
            curRightPos = $slider.children().index(curRight),
            totalWorks = $slider.children().length,
            $left = $slider.find('.slider--item-left'),
            $center = $slider.find('.slider--item-center'),
            $right = $slider.find('.slider--item-right'),
            $item = $slider.find('.slider--item');
  
        $slider.animate({ opacity: 0 }, 400);
  
        setTimeout(function() {
          if ($this.hasClass('slider--next')) {
            if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
              $left.removeClass('slider--item-left').next().addClass('slider--item-left');
              $center.removeClass('slider--item-center').next().addClass('slider--item-center');
              $right.removeClass('slider--item-right').next().addClass('slider--item-right');
            } else {
              if (curLeftPos === totalWorks - 1) {
                $item.removeClass('slider--item-left').first().addClass('slider--item-left');
                $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                $right.removeClass('slider--item-right').next().addClass('slider--item-right');
              } else if (curCenterPos === totalWorks - 1) {
                $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                $item.removeClass('slider--item-center').first().addClass('slider--item-center');
                $right.removeClass('slider--item-right').next().addClass('slider--item-right');
              } else {
                $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                $item.removeClass('slider--item-right').first().addClass('slider--item-right');
              }
            }
          } else {
            if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
              $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
              $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
              $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
            } else {
              if (curLeftPos === 0) {
                $item.removeClass('slider--item-left').last().addClass('slider--item-left');
                $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
              } else if (curCenterPos === 0) {
                $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                $item.removeClass('slider--item-center').last().addClass('slider--item-center');
                $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
              } else {
                $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                $item.removeClass('slider--item-right').last().addClass('slider--item-right');
              }
            }
          }
        }, 400);
  
        $slider.animate({ opacity: 1 }, 400);
      });
    }
  
    // Initialize sliders
    handleSliderNavigation('work-slider');
    handleSliderNavigation('solutions-slider');
  }
  
    function transitionLabels() {
  
      $('.work-request--information input').focusout(function(){
  
        var textVal = $(this).val();
  
        if (textVal === "") {
          $(this).removeClass('has-value');
        }
        else {
          $(this).addClass('has-value');
        }
  
        // correct mobile device window position
        window.scrollTo(0, 0);
  
      });
  
    }
  
    outerNav();
    workSlider();
    ourSolutionSlider();
    transitionLabels();
  
  });
  