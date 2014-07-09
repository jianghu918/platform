/**
 * @package 4seasons
 * @subpackage 4seasons HTML
 * @since 4seasons HTML 1.0
 *
 * Template Scripts
 * Created by Olechka

 Custom JS

 1. Main Navigation
 2. Flexslider
 3. Isotope
 4. Prettyphoto
 4. Datepicker
 -- Misc
 */

jQuery(function($){


    /* ----------------------------------------------------------- */
    /*  1. Main Navigation
     /* ----------------------------------------------------------- */

    $('ul.sf-menu').superfish({
        autoArrows	: true,
        delay			: 800,
        autoArrows:  false,
        useClick:    false,
        animation	: {opacity:'show', height:'show'},
        animationOut:  {height:'hide'},
        speed			: 'fast'
    });

    /* Mobile Menu */
    var $menu = $('#menu'),
        $menulink = $('.menu-link');

    $menulink.click(function() {
        $menulink.toggleClass('active');
        $menu.toggleClass('active');
        return false;
    });


    /* ----------------------------------------------------------- */
    /*  2. Flexslider
     /* ----------------------------------------------------------- */

    $('.flexslider').flexslider({
        animation: "slide",
        directionNav: false,
        slideshowSpeed: 6000
    });


    /* ----------------------------------------------------------- */
    /*  3. Isotope
     /* ----------------------------------------------------------- */

    (function() {

        // modified Isotope methods for gutters in masonry
        $.Isotope.prototype._getMasonryGutterColumns = function() {
            var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
            containerWidth = this.element.width();

            this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
                // or use the size of the first item
                this.$filteredAtoms.outerWidth(true) ||
                // if there's no items, use size of container
                containerWidth;

            this.masonry.columnWidth += gutter;

            this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
            this.masonry.cols = Math.max( this.masonry.cols, 1 );
        };

        $.Isotope.prototype._masonryReset = function() {
            // layout-specific props
            this.masonry = {};
            // FIXME shouldn't have to call this again
            this._getMasonryGutterColumns();
            var i = this.masonry.cols;
            this.masonry.colYs = [];
            while (i--) {
                this.masonry.colYs.push( 0 );
            }
        };

        $.Isotope.prototype._masonryResizeChanged = function() {
            var prevSegments = this.masonry.cols;
            // update cols/rows
            this._getMasonryGutterColumns();
            // return if updated cols/rows is not equal to previous
            return ( this.masonry.cols !== prevSegments );
        };


        // Set Gutter width
        var gutterSize;

        function getWindowWidth() {
            if( $(window).width() < 480 ) {
                gutterSize = 14;
            } else if( $(window).width() < 768 ) {
                gutterSize = 10;
            } else if( $(window).width() < 980 ) {
                gutterSize = 20;
            } else {
                gutterSize = 23;
            }
        }


        // Portfolio settings
        var $container          = $('.project-feed');
        var $filter             = $('.project-feed-filter');

        $(window).smartresize(function(){
            getWindowWidth();
            $container.isotope({
                filter              : '*',
                resizable           : true,
                // set columnWidth to a percentage of container width
                masonry: {
                    gutterWidth     : gutterSize
                }
            });
        });

        $container.imagesLoaded( function(){
            $(window).smartresize();
        });

        // Filter items when filter link is clicked
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('current');
            $(this).addClass('current');
            $container.isotope({
                filter             : selector,
                animationOptions   : {
                    animationDuration  : 750,
                    easing             : 'linear',
                    queue              : false,
                }
            });
            return false;
        });

    })();


    /* ----------------------------------------------------------- */
    /*  4. Prettyphoto
     /* ----------------------------------------------------------- */

    // store the viewport width in a variable
    var viewportWidth = $('body').innerWidth();

    $("a[rel^='prettyPhoto']").prettyPhoto({
        overlay_gallery: false,
        theme: 'custom_square',
        social_tools: false,
        horizontal_padding: 30,
        changepicturecallback: function(){
            // 1024px is presumed here to be the widest mobile device. Adjust at will.
            if (viewportWidth < 1025) {
                $(".pp_pic_holder.pp_default").css("top",window.pageYOffset+"px");
            }
        }
    });



    /* ----------------------------------------------------------- */
    /*  5. Datepicker
     /* ----------------------------------------------------------- */
    $('.date-pick').datePicker({
        clickInput:true,
        createButton:false
    }).val(new Date().asString()).trigger('change').bind('click',
        function()
        {
            $(this).dpDisplay();
            this.blur();
            return false;
        }
    );
    $('.date-pick').dpSetPosition($.dpConst.POS_TOP, $.dpConst.POS_RIGHT);


    /* ----------------------------------------------------------- */
    /*  Misc
     /* ----------------------------------------------------------- */


    // Back to Top

    // scroll body to 0px on click
    $('#to-top').click(function () {
        $('body,html').stop(false, false).animate({
            scrollTop: 0
        }, 800);
        return false;
    });


    // Booking Table Modal init
    $('#booking-table-trigger').click(function(e) {
        e.preventDefault();
        $('#booking-table-modal').reveal({
            animation: 'fade',
            animationspeed: 200,
            closeonbackgroundclick: true
        });
    });

    // Order Catering Modal init
    $('#order-catering-trigger').click(function(e) {
        e.preventDefault();
        $('#order-catering-modal').reveal({
            animation: 'fade',
            animationspeed: 200,
            closeonbackgroundclick: true
        });
    });



    // Custom Select
    $('select.dropkick').dropkick();

    //Carousel
    $('#latest-events').carouFredSel({
        auto: false,
        prev: '#prev1',
        next: '#next1',
        responsive: true,
        width: '100%',
        scroll: 1
    });

    $('#upcoming-events').carouFredSel({
        auto: false,
        prev: '#prev2',
        next: '#next2',
        responsive: true,
        width: '100%',
        scroll: 1
    });

    // Tipsy
    $('.extra-actions a, .tipsy-link').tipsy({
        fade: false,
        gravity: 'w',
        opacity: 1,
        offset: 0
    });

    // Tipsy Top
    $('.tipsy-s').tipsy({
        fade: true,
        gravity: 's',
        opacity: 1,
        offset: 0
    });

    /* nth-child fallback for ie8 */
    $(".members-list .member:nth-child(3n), .menu__grid .menu-item:nth-child(3n), .offer-item:nth-child(3n)").addClass("nomargin");


    // We should help browser if it can't display placeholder by himself
    if(!Modernizr.input.placeholder){

        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }
});