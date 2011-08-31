(function($)
 {
	

	var activeTarget,
	      $window = $(window),
	      position = {},
	      nav = $('.home > .topbar li a'),
	      targets = nav.map(function () {
	        return $(this).attr('href');
	      });
	    


	  function setButton(id) {
	    nav.parent("li").removeClass('active');
	    $(nav[$.inArray(id, targets)]).parent("li").addClass('active');
	  }

	  function processClick(e) {
	      
			for(i=0; i< targets.length;i++){
	        	if(url == targets[i])
		    	{
	        		setButton(targets[i]);
					break;
				}
		}
	     
	  }

	 
	    processClick();
	  
	
	
	
    $.fn.et_switcher = function(options)
    {
        var defaults =
        {
            slides: '>div',
            activeClass: 'active',
            linksNav: '',
            findParent: true,
            //use parent elements in defining lengths
            lengthElement: 'li',
            //parent element, used only if findParent is set to true
            useArrows: false,
            arrowLeft: 'prevlink',
            arrowRight: 'nextlink',
            auto: false,
            autoSpeed: 5000
        };

        var options = $.extend(defaults, options);

        return this.each(function()
        {
            var slidesContainer = jQuery(this);
            slidesContainer.find(options.slides).hide().end().find(options.slides).filter(':first').css('display', 'block');

            if (options.linksNav != '') {
                var linkSwitcher = jQuery(options.linksNav);

                linkSwitcher.click(function() {
                    var targetElement;

                    if (options.findParent) targetElement = jQuery(this).parent();
                    else targetElement = jQuery(this);

                    if (targetElement.hasClass('active')) return false;

                    /*  targetElement.siblings().removeClass('active').end().addClass('active');
							var ordernum = targetElement.prevAll(options.lengthElement).length;
							slidesContainer.find(options.slides).filter(':visible').hide()
								.end().end().find(options.slides).filter(':eq('+ordernum+')').stop().fadeIn(700);
						*/

                    targetElement.siblings('.active').animate({
                        marginTop: '-18px'
                    },
                    500,
                    function() {
                        jQuery(this).removeClass('active');

                    });
                    targetElement.animate({
                        marginTop: '6px'
                    },
                    500,
                    function() {
                        jQuery(this).addClass('active');

                    });
                    var ordernum = targetElement.prevAll(options.lengthElement).length;

                    slidesContainer.find(options.slides).filter(':visible').hide().end().end().find(options.slides).filter(':eq(' + ordernum + ')').stop().fadeIn(700);

                    if (typeof interval != 'undefined') {
                        clearInterval(interval);
                        auto_rotate();
                    };

                    return false;
                });
            };

            jQuery('#' + options.arrowRight + ', #' + options.arrowLeft).click(function() {

                var slideActive = slidesContainer.find(options.slides).filter(":visible"),
                nextSlide = slideActive.next(),
                prevSlide = slideActive.prev();

                if (jQuery(this).attr("id") == options.arrowRight) {
                    if (nextSlide.length) {
                        var ordernum = nextSlide.prevAll().length;
                    } else {
                        var ordernum = 0;
                    }
                };

                if (jQuery(this).attr("id") == options.arrowLeft) {
                    if (prevSlide.length) {
                        var ordernum = prevSlide.prevAll().length;
                    } else {
                        var ordernum = slidesContainer.find(options.slides).length - 1;
                    }
                };

                slidesContainer.find(options.slides).filter(':visible').hide().end().end().find(options.slides).filter(':eq(' + ordernum + ')').stop().fadeIn(700);

                if (typeof interval != 'undefined') {
                    clearInterval(interval);
                    auto_rotate();
                };

                return false;
            });

            if (options.auto) {
                auto_rotate();
            };

            function auto_rotate() {
                interval = setInterval(function() {
                    var slideActive = slidesContainer.find(options.slides).filter(":visible"),
                    nextSlide = slideActive.next();

                    if (nextSlide.length) {
                        var ordernum = nextSlide.prevAll().length;
                    } else {
                        var ordernum = 0;
                    }

                    if (options.linksNav === '')
                    jQuery('#' + options.arrowRight).trigger("click");
                    else
                    linkSwitcher.filter(':eq(' + ordernum + ')').trigger("click");
                },
                options.autoSpeed);
            };
        });
    }
})(jQuery);

var $featuredArea = jQuery('#featured #slides');

if ($featuredArea.length) {
    $featuredArea.et_switcher({
        linksNav: '#switcher a',
        auto: true,
        autoSpeed: 6000,
        findParent: true,
        lengthElement: 'div'
    });
};


var $slider_content = jQuery('#scroller #items');
if ($slider_content.length) {
    $slider_content.cycle({
        fx: 'scrollHorz',
        timeout: 0,
        speed: 700,
        cleartypeNoBg: true,
        next: 'a#right-arrow',
        prev: 'a#left-arrow'
    });
};

var $featured = jQuery('#product-slider'),
$featured_content = jQuery('#product-slides'),
$controller = jQuery('#product-thumbs'),
$slider_control_tab = $controller.find('a');
if ($featured_content.length) {
    $featured_content.cycle({
        fx: 'fade',
        timeout: 0,
        speed: 700,
        cleartypeNoBg: true
    });

    var ordernum;

    function gonext(this_element) {
        $controller.find("a.active").removeClass('active');

        this_element.addClass('active');

        ordernum = this_element.attr("rel");
        $featured_content.cycle(ordernum - 1);

        if (typeof interval != 'undefined') {
            clearInterval(interval);
            auto_rotate();
        };
    }

    $slider_control_tab.click(function() {
        gonext(jQuery(this));
        return false;
    });
};

