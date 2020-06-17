"use strict";
// User agent detect --> Begin

/****************** PB ********************/

function cws_tabs_init (){
	jQuery.fn.cws_tabs = function (){
		jQuery(this).each(function (){
			var parent = jQuery(this);
			var tabs = parent.find("[role='tab']");
			var tab_items_container = parent.find("[role='tabpanel']").parent();
			tabs.each(function(){
				jQuery(this).on("click", function (){
					var active_ind = jQuery(this).siblings(".active").eq(0).attr("tabindex");
					jQuery(this).addClass("active").siblings().removeClass("active");
					var item = tab_items_container.find("[tabindex='"+this.tabIndex+"']");
					item.siblings("[tabindex='"+active_ind+"']").eq(0).fadeToggle("150",'swing',function(){
						item.fadeToggle("150");
					});
				});
			});
		});
	}
}

function cws_accordion_init (){
	jQuery.fn.cws_accordion = function () {
		jQuery(this).each(function (){
			var sections = jQuery(this).find(".accordion_section");
			sections.each( function (index, value){
				var section_index = index;
				jQuery(this).find(".accordion_title").on("click", function (){
					jQuery(this).siblings(".accordion_content").slideDown("300");
					sections.eq(section_index).addClass("active");
					sections.eq(section_index).siblings().removeClass("active").find(".accordion_content").slideUp("300");
				});
			});
		});
	}
}

function cws_toggle_init (){
	jQuery.fn.cws_toggle = function ( item_class, opener_class, toggle_section_class ){
		var i=0;
		jQuery(this).each( function (){
			i++;
			var sections = jQuery(this).find("."+item_class);
			var j=0;
			sections.each( function (index, value){
				j++;
				var section_index = index;
				jQuery(this).find("."+opener_class).eq(0).on("click", function (){
					if (!sections.eq(section_index).hasClass("active")){
						sections.eq(section_index).addClass("active");
						sections.eq(section_index).find("."+toggle_section_class).eq(0).slideDown("300");
					}
					else{
						sections.eq(section_index).removeClass("active");
						sections.eq(section_index).find("."+toggle_section_class).eq(0).slideUp("300");
					}
				});
			});
		});
	}
}

function init_pretty_photo() {
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
		deeplinking : false,
		keyboard_shortcuts : false
	});
	jQuery('a.prettyPhoto[data-rel^="prettyPhoto"]').prettyPhoto().each(function() {
		if (!(jQuery(this).children(".kids_curtain")).length) {
			jQuery(this).append('<span class="kids_curtain">&nbsp;</span>');
		}
	});
}

function cws_lang_text (){
	if(jQuery(".kids_social .lang_bar").length){
		jQuery(".kids_social .lang_bar>div ul a").each(function(){
			if (!jQuery(".kids_social .lang_bar>div ul a>span.icl_lang_sel_native").length) {
				if(jQuery(this).text().replace(/\s+/g, '').length){
					jQuery(this).append("<span>"+jQuery(this).text().trim()+"</span>")
				};
			};
		})
	}
}

function cws_patern_width (){
	if (jQuery(".bg-level-2").length) {
		jQuery(".page-content>.bg-level-2").width((jQuery(".page-content").width() - jQuery(".page-content>.l-page-width").width())/2 -20);
		jQuery(".bg-level-2-page-width-container>.bg-level-2").width((jQuery(".bg-level-2-page-width-container").width() - jQuery(".bg-level-2-page-width-container>.l-page-width").width())/2 -20);
	};
	if (jQuery(".bg-level-2-page-width-container>.l-page-width>.kids_slider_bg").length) {
		jQuery(".bg-level-2-page-width-container").addClass("with-slider");
	};
}

/* Twitter --> Begin */
function widget_carousel_init (){

	jQuery(".widget_carousel").filter(function(){return !jQuery(this).parents("aside").length}).each(function(){
		jQuery(this).owlCarousel({
			singleItem:true,
			slideSpeed:300,
			navigation: false,
			pagination: false
		});
		var owl = jQuery(this);
		jQuery(this).parents(".cws-widget").find(".widget_carousel_nav").each(function (){
			jQuery(this).children(".next").click(function(){
				owl.trigger('owl.next');
			})
			jQuery(this).children(".prev").click(function (){
				owl.trigger('owl.prev');
			});
		});
		jQuery(this).parents(".widget").find(".widget_carousel_nav").each(function (){
			jQuery(this).children(".next").click(function(){
				owl.trigger('owl.next');
			})
			jQuery(this).children(".prev").click(function (){
				owl.trigger('owl.prev');
			});
		});
	});

	jQuery("aside .widget_carousel").each(function(){
		jQuery(this).owlCarousel({
			singleItem:true,
			slideSpeed:300,
			navigation: false,
			pagination: true
		});
	});
}
/* Twitter --> End */

function cws_touch_button_click(){
	jQuery(document).on("click" , "#kids_main_nav ul li>span" , function(){		
		if (jQuery(this).hasClass("opened")) {
			jQuery(this).removeClass("opened");
		}else{
			jQuery(this).addClass("opened");
		}
	})
	jQuery(document).on("click" , "#kids_main_nav .menu-button" , function(){		
		if (jQuery(this).hasClass("opened")) {
			jQuery(this).removeClass("opened");
		}else{
			jQuery(this).addClass("opened");
		}
	})

}


function cws_lava_lam() {

	if( $(".nav_cat .menu").length ) {
		$(this).find(".current-menu-item a").addClass("selectedLava");
		$(".nav_cat .menu").mouseleave(function() {
			$(this).find("a.selectedLava").removeClass("not_active");
		});
		$(".nav_cat .menu").mouseenter(function(){
			$(this).find("a.selectedLava").addClass("not_active");
		})
		$(".nav_cat .menu").find(".menu-item a.selectedLava").mouseout(function() {
			$(this).addClass("not_active");
		});
		$(".nav_cat .menu").find(".menu-item a.selectedLava").mouseover(function() {
				$(this).removeClass("not_active");
		});
		$(".nav_cat .menu").lavaLamp({
			target: "li > a",
			container: "li",
			fx: "easeOutCubic",
			speed: 400
		});	
	}
};



jQuery(document).ready(function (){
	/* init plugins */
	cws_touch_button_click()
	cws_patern_width ();
	cws_lang_text ();
	cws_tabs_init ();
	cws_accordion_init ();
	cws_toggle_init ();
	cws_progress_bar_init ();
	shiping_calc_button();
	widget_carousel_init();
	wp_image_popup();
	cws_lava_lam();

	/**/
	/* map */
	/**/
	if( document.getElementById('map') )
	{
		var script = document.createElement('script');
	 	script.type = 'text/javascript';
	 	script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=init_map';
	 	document.body.appendChild(script);
 	}	
	
	/* \init plugins */
	jQuery(".single_bar").cws_progress_bar();
	jQuery(".cws_widget_content.tab_widget").cws_tabs();
	jQuery(".cws_widget_content.accordion_widget").cws_accordion();
	jQuery(".cws_widget_content.toggle_widget,.services").cws_toggle("accordion_section","accordion_title","accordion_content");
	if ( $('.country_select').length ) {
		$('.country_select').select2();
	};
	
	$('.footer #calendar_wrap').datepicker({
		prevText: '<i class="fa fa-angle-double-left"></i>',
    	nextText: '<i class="fa fa-angle-double-right"></i>',
    	firstDay: 1,
    	dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ]
	});
});

jQuery(window).load(function (){
	/*isotope_init();*/
	setREVStartSize();
	if ($('.rev_slider').length) {
			
	    $('.rev_slider').show().revolution({
	    	dottedOverlay: "none",
			delay: 9000,
			startwidth: 1150,
			startheight: 400,
			hideThumbs: 0,

			thumbWidth: 100,
			thumbHeight: 50,
			thumbAmount: 5,


			simplifyAll: "off",

			navigationType: "none",
			navigationArrows: "solo",
			navigationStyle: "round",

			touchenabled: "on",
			onHoverStop: "on",
			nextSlideOnWindowFocus: "off",

			swipe_threshold: 75,
			swipe_min_touches: 1,
			drag_block_vertical: false,



			keyboardNavigation: "off",

			navigationHAlign: "center",
			navigationVAlign: "bottom",
			navigationHOffset: 0,
			navigationVOffset: 0,

			soloArrowLeftHalign: "left",
			soloArrowLeftValign: "center",
			soloArrowLeftHOffset: 2,
			soloArrowLeftVOffset: 0,

			soloArrowRightHalign: "right",
			soloArrowRightValign: "center",
			soloArrowRightHOffset: 2,
			soloArrowRightVOffset: 0,

			shadow: 0,
			fullWidth: "on",
			fullScreen: "off",

			spinner: "spinner0",

			stopLoop: "off",
			stopAfterLoops: -1,
			stopAtSlide: -1,

			shuffle: "off",

			autoHeight: "off",
			forceFullWidth: "off",



			hideThumbsOnMobile: "off",
			hideNavDelayOnMobile: 1500,
			hideBulletsOnMobile: "off",
			hideArrowsOnMobile: "off",
			hideThumbsUnderResolution: 0,

			hideSliderAtLimit: 0,
			hideCaptionAtLimit: 0,
			hideAllCaptionAtLilmit: 0,
			startWithSlide: 0
	    })
  }
});
var setREVStartSize = function() {
	var tpopt = new Object();
	tpopt.startwidth = 1150;
	tpopt.startheight = 400;
	tpopt.container = jQuery('#rev_slider_1_1');
	tpopt.fullScreen = "off";
	tpopt.forceFullWidth = "off";

	tpopt.container.closest(".rev_slider_wrapper").css({
		height: tpopt.container.height()
	});
	tpopt.width = parseInt(tpopt.container.width(), 0);
	tpopt.height = parseInt(tpopt.container.height(), 0);
	tpopt.bw = tpopt.width / tpopt.startwidth;
	tpopt.bh = tpopt.height / tpopt.startheight;
	if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
	if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
	if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
	if (tpopt.bh > 1) {
		tpopt.bw = 1;
		tpopt.bh = 1
	}
	if (tpopt.bw > 1) {
		tpopt.bw = 1;
		tpopt.bh = 1
	}
	tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
	if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
	if (tpopt.fullScreen == "on") {
		tpopt.height = tpopt.bw * tpopt.startheight;
		var cow = tpopt.container.parent().width();
		var coh = jQuery(window).height();
		if (tpopt.fullScreenOffsetContainer != undefined) {
			try {
				var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
				jQuery.each(offcontainers, function(e, t) {
					coh = coh - jQuery(t).outerHeight(true);
					if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
				})
			} catch (e) {}
		}
		tpopt.container.parent().height(coh);
		tpopt.container.height(coh);
		tpopt.container.closest(".rev_slider_wrapper").height(coh);
		tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
		tpopt.container.css({
			height: "100%"
		});
		tpopt.height = coh;
	} else {
		tpopt.container.height(tpopt.height);
		tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
		tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
	}
};

jQuery(window).resize(function(){
	cws_patern_width ();
});

function getScrollBarWidth () {
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild (inner);

    document.body.appendChild (outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2)
        w2 = outer.clientWidth;
    document.body.removeChild (outer);

    return (w1 - w2);
};

var original_bg_image_width, original_bg_image_height;


/* Footer image color change --> Begin */

    var original_footer_image_bg_color;
    var original_footer_image_border_color;
    var setFooterImageColors = function($footer_image_wrapper) {
        $footer_image_wrapper.css({
            backgroundColor : '',
            borderColor : ''
        });
        original_footer_image_bg_color = $footer_image_wrapper.css('backgroundColor');
        original_footer_image_border_color = $footer_image_wrapper.css('border-left-color');
    }

/* Footer image color change --> End */

jQuery(document).ready(function($) {

/* ######################### DOM READY - Begin ######################### */
	if ( $(".creaws_widget_cform").length ) {
		$(".creaws_widget_cform").validate();
	}
/* Contact Page error handlers --> Begin */

	if ( $(".contact_Form").length ) {
		$(".contact_Form").validate({
		  rules: {
			contactName: "required",
			cptch_number: "required",
			comments: "required",
			email: {
			  required: true,
			  email: true
			}
		  },
		  messages: {
			contactName: "Please specify your name",
			comments: "Please type in your message",
			cptch_number: "Please fill out this field!",
			email: {
			  required: "We need your email address to contact you",
			  email: "Your email address must be in the format of name@domain.com"
			}
		  }
		});
	}
/* Contact Page error handlers --> End */

/* Cloud */

$(".widget.type-3 h3.widget-title").append("<div class='cloud-element-1'></div><div class='cloud-element-2'></div><div class='cloud-element-3'></div>")

/* Social Icons --> Begin */
	if ($('.kids_social').length) {
		$('.kids_social>li').not($('#search-form').parent('li'), this).hover(function() {
			$(this).children('span').stop(true,false).animate({
				height: "100%",
				opacity: "1"
			}, 'normal');
		}, function() {
			$(this).children('span').stop(true,false).animate({
				height: "0",
				opacity: "0"
			}, 'normal');
		});
	};

/* Social Icons --> End */

/* Top Panel --> Begin */

	var $panel = $(".top-panel .l-page-width");

	$('.openbtn').on('click','a',function(e) {

		var $target = $(e.target);

		if($target.hasClass('hide')) {
			$panel.stop(true,false).animate({
				opacity: '0'
			},200);
			$target.blur();
		}

		$panel.slideToggle(600, function(){

			$target.toggleClass('hide');

			if($(this).css('display') == 'block') {
				$(this).stop(true,false).animate({
					opacity:'1'
				},200);
			} else {
				$(this).stop(true,false).animate({
					opacity:'0'
				},200);
			}
		});

		e.preventDefault();
	});

/* Top Panel --> End */

/* Search Form --> Begin */

	var sform = $('.kids_social #search-form');

	$('li.search a').click(function(){
		if ( !($(this).parent().hasClass("hide")) ) {
			$(this).parent().addClass('hide');
			sform.parent().addClass('hide');
			sform.parent().animate({
				opacity : 1
			}, 'normal').show();
			sform.parent().find('#s').focus();
			
		} else {
			$(this).parent().removeClass('hide');
			sform.parent().removeClass('hide');
			var sValue = sform.find('#s').val();
			if (sValue){
				sform.find('#search-submit').click();
			}
			sform.parent().animate({
				opacity : 0
			}, 'normal');
		}
		
	});

/* Search Form --> End */

/* Slider control fade --> Begin */

    function fadeInControl($controlGroup) {
        $controlGroup.stop(true,true).animate({opacity : 1}, 400);
    }
    function fadeOutControl($controlGroup) {
        $controlGroup.stop(true,true).animate({opacity : 0.3}, 400);
    }

/* Slider control fade --> End */

/* jCarousel --> Begin */

	$(".projects_carousel").each(function (){
		var flag = false;
		$(this).children().each(function (){
			if ($(this).hasClass("woocommerce")){
				carousel_init(($(this).find("ul.products")),4);
				flag = true;
			}
		});
		if (!flag){
			carousel_init(this,$(this).attr("data-carousel-column"));
		}
	})

	$(".shortcode_carousel").each(function (){
		var col_num = jQuery(this).attr("data-carousel-column")
		if (!col_num) {
			col_num = 4;
		};
		var flag = false;
		if (!flag){
			carousel_init($(this).find(".carousel_content>*:not(.woocommerce)"),col_num);
		}
	})

	$(".shortcode_carousel").each(function (){
		var flag = false;
		if (!flag){
			carousel_init($(this).find("ul.products"),4);
		}
	})

function carousel_init (target,col){
	var col,col_v,col_vi
	if (jQuery(target).parents(".double-sidebar").length) {
		switch (true) { // invariant TRUE instead of variable foo
	    case col >= 4:
	    	col = 2;
	        col_v = 2;
	        col_vi = 2;
	        break;
	    case col == 3:
	    	col = 2;
	        col_v = 2;
	        col_vi = 2;
	        break;
	    case col >= 2:
	        col_v = 2;
	        col_vi = 2;
	        break;
	    case col >= 1:
	        col_v = 1;
	        col_vi = 1;
	        break;
	    default:
	        col_v = 2;
	        col_vi = 2;
		}
	}else{
		if (jQuery(target).parents(".single-sidebar").length) {
			switch (true) { // invariant TRUE instead of variable foo
		    case col >= 4:
		    	col = 3;
		        col_v = 3;
		        col_vi = 2;
		        break;
		    case col == 3:
		    	col = 3;
		        col_v = 3;
		        col_vi = 2;
		        break;
		    case col >= 2:
		        col_v = 2;
		        col_vi = 2;
		        break;
		    case col >= 1:
		        col_v = 1;
		        col_vi = 1;
		        break;
		    default:
		        col_v = 3;
		        col_vi = 2;
			}
		}else{
			switch (true) { // invariant TRUE instead of variable foo
			    case col >= 4:
			        col_v = 4;
			        col_vi = 3;
			        break;
			    case col == 3:
			        col_v = 3;
			        col_vi = 3;
			        break;
			    case col >= 2:
			        col_v = 2;
			        col_vi = 2;
			        break;
			    case col >= 1:
			        col_v = 1;
			        col_vi = 1;
			        break;
			    default:
			        col_v = 4;
			        col_vi = 3;
			}
		}

	}
	$(target).owlCarousel({
		items: col,
		itemsDesktop: false,
		itemsDesktopSmall: [1173,col_v],
		itemsTablet: [964,col_vi],
		itemsTabletSmall: [750,1],
		navigation: true,
		navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		pagination: false
	});
}

  if($('.minigallery-list .minigallery').length) {
	$(".minigallery-list .minigallery").jCarouselLite({
		btnNext: ".next",
		btnPrev: ".prev",
		scroll: 3,
		visible: 9,
		speed: 400,
		mouseWheel: true,
		circular:false,
		easing: "easeInOutCubic"
	});
  }

  if($('.minigallery-list2 .minigallery').length) {
	$(".minigallery-list2 .minigallery").jCarouselLite({
		btnNext: ".next2",
		btnPrev: ".prev2",
		scroll: 3,
		visible: 9,
		speed: 400,
		mouseWheel: true,
		circular:false,
		easing: "easeInOutCubic"
	});
  }

/* jCarousel --> End */

/* Search form --> Begin */

    var $search_form = $('#kids_search_form');
    var $search_wrapper = $search_form.find('.kids_search_wrapper');
    var $search_input = $search_form.find('input');

    $search_form.hover(function() {
        $search_wrapper.stop(true,true).fadeIn(600);
		$search_wrapper.find('input[type=text]').focus();
    },function() {
        if ($search_input.is(":focus")) {
            $search_wrapper.stop(true,true).fadeOut(400);
        } else {
            $search_input.blur(function() {
                $search_wrapper.stop(true,true).fadeOut(400);
                $search_input.unbind('blur');
            });
        }
    });

/* Search form --> End */

/* Main navigation --> Begin */



/* Main navigation --> End */

/* Pretty photo popup --> Begin */

	if($('.prettyPhoto').length) {

		(function() {
			$('a.prettyPhoto').prettyPhoto().each(function() {
				if (!($(this).children(".kids_curtain")).length) {
					$(this).append('<span class="kids_curtain">&nbsp;</span>');
				}
			});
		})();

	}

/* Pretty photo popup --> End */

/* To top --> Begin */

	(function() {
		var extend = {
				button      : '#kids-back-top',
				text        : 'Back to Top',
				min         : 200,
				fadeIn      : 400,
				fadeOut     : 400,
				speed		: 800,
				easing		: 'easeOutQuint'
			}

		$('body').append('<div id="' + extend.button.substring(1) + '"><a href="#top" title="' + extend.text + '"><span></span></a></div>');

		$(window).scroll(function() {
			var pos = $(window).scrollTop();

			if (pos > extend.min) {
				$(extend.button).fadeIn(extend.fadeIn);
			}
			else {
				$(extend.button).fadeOut (extend.fadeOut);
			}

		});

		var pos = $(window).scrollTop();

		if (pos > extend.min) {
			$(extend.button).fadeIn(extend.fadeIn);
		}
		else {
			$(extend.button).fadeOut (extend.fadeOut);
		}

		$(extend.button).add(extend.backToTop).click(function(e){
			$('html, body').animate({scrollTop : 0}, extend.speed, extend.easing);
			e.preventDefault();
		});

	})();

/* end Back to Top */

/* To top --> End */

/* Bottom container images --> Begin */

    setFooterImageColors($('#kids_bottom_container .kids_image_wrapper'));

    if ($('#kids_bottom_container .kids_image_wrapper').length) {
        $('#kids_bottom_container .kids_image_wrapper').hover(function() {
            $(this).stop(true,true).animate({backgroundColor : "#ddf0f7", borderColor : "#ddf0f7"}, 600);
        },function() {
            $(this).stop(true,true).animate({backgroundColor : original_footer_image_bg_color, borderColor : original_footer_image_border_color}, 400);
        });
    }

/* Bottom container images --> End */


/* Pricing Tables --> Begin */

	(function() {

		if($('.pricing-table').length) {

			var pt = $('.pricing-table .column', this);
				pt.find('li:even:not(.footer_row):not(.header_row)').addClass('even');
				pt.first().addClass('first');
				pt.last().addClass('last');
				pt.find('li:not(.header_row):first').css('padding-top','2.2em');
				pt.find('li:not(.footer_row):last').css('padding-bottom','2.2em');
			var ptFirst = $('.pricing-table .column:first-child');
			var ptLast = $('.pricing-table .column:last-child');
				ptFirst.find('li:not(.footer_row):not(.header_row)').css('border-left', '2px solid #98c2e1');
				ptLast.find('li:not(.footer_row):not(.header_row)').css('border-right', '2px solid #98c2e1');
				$('.pricing-table .column:last-child').find('.footer_row').addClass('footer_border');

		}

	})();


/* Pricing Tables --> End */

/* Accordion --> Begin */

	if($('ul.highlighter').length) {
		$('ul.highlighter').accordion({active:'.selected',autoHeight:false,header:"a",collapsible:true,event:"click"});
	}

	//////////////////////////////

		$('.widget_categories>ul>li:has(ul)').each(function(index){
			$(this).find('ul').hide();
			$(this).append('<span class="catappendspan"></span>');
			$(this).click(function(){
				var childrenFunction = $(this).find('ul.children');
				$(this).find('.catappendspan').toggleClass('active');
				childrenFunction.slideToggle();
			});
		});

	//////////////////////////////

/* Accordion --> End */

/* Tabs --> Begin */

	$('.tabs').each( function () {
		//When page loads...
		var parent = this;
		$(this).children("ul.tabs li:first").addClass("active").show(); //Activate first tab
		$(parent).parent().children().children(".entry-content").hide();
		$(this).parent().children(".tab_container").children(".entry-content:first").show(); //Show first tab content

		//On Click Event
		
		$(this).children("ul.tabs li").click(function() {
			$(parent).children("ul.tabs li").removeClass("active"); //Remove any "active" class
			$(this).addClass("active"); //Add "active" class to selected tab
			$(parent).parent().children().children(".entry-content").hide(); //Hide all tab content

			var activeTab = $(this).find("a").attr("href");//Find the href attribute value to identify the active tab + content
			$(parent).parent().find(activeTab).fadeIn('slow'); //Fade in the active ID content
			return false;
		});
	} );

/* Tabs --> End */

/* Toggle --> Begin */

	if($('.toggle_container').length) {
		$(".toggle_container").hide();

		$("div.trigger").click(function(){
			$(this).toggleClass("active").next().slideToggle("slow");
			return false;
		});
	}

/* Toggle --> End */


	if (jQuery("a[data-rel]").length) {
		jQuery('a[data-rel]').each(function() {jQuery(this).attr('rel', jQuery(this).data('rel'));});
	}

	if($('.splitter').length) {
		$('.splitter').lavaLamp({fx: "easeOutCubic", speed: 400});
	}


/* Tables --> Begin */

	if($('.custom-table').length) {

		$('.custom-table thead tr th:first-child,.custom-table2 thead tr th:first-child').addClass('radius-left');
		$('.custom-table thead tr th:last-child, .custom-table2 thead tr th:last-child').addClass('radius-right');
		$('.custom-table tbody tr td:last-child, .custom-table2 tbody tr td:last-child').addClass('noborder');

	}

/* Tables --> End */

/* Box close --> Begin */

	function handler(event) {

		var $target = $(event.target);

		if($target.is('.close-box')) {
			var $box = $target.parent();
			$box.animate({opacity: '0'}, 500, function() {
				$(this).slideUp(500, function() {
					$(this).remove();
				});
			});
		}

	}

	$('.message_box').click(handler);

/* Box close --> End */

/*Responsive */

	$(".flexnav").flexNav();

/* Recent Posts arrows fix */

	$(".camera_pag").wrapAll('<div class="camera_pagination"></div>').wrapAll('<div class="camerapag_left"></div>').wrapAll('<div class="camerapag_right"></div>');

	$(".flex-control-nav").wrapAll('<div class="camera_pagination_wrapper"></div>').wrapAll('<div class="camera_pagination"></div>').wrapAll('<div class="camerapag_left"></div>').wrapAll('<div class="camerapag_right"></div>').wrapAll('<div class="camera_pag"></div>');

/*Responsive --> End */


});// ######################### DOM READY - END #########################

/* Pretty photo gallery fix --> Begin */
	jQuery(function($) { init_pretty_photo(); });
/* Pretty photo gallery fix --> End */


/* PROGRESS BAR */

function cws_progress_bar_init (){
	jQuery.fn.cws_progress_bar = function (){
		jQuery(this).each( function (){
			var el = jQuery(this);
			var done = false;
			if (!done) done = progress_bar_controller(el);
			jQuery(window).scroll(function (){
				if (!done) done = progress_bar_controller(el);
			});
		});
	}
}

function progress_bar_controller (el){
	is_visible_init ()
	if (el.is_visible()){
		var progress = el.find(".progress");
		var value = parseInt( progress.attr("data-value") );
		var width = parseInt(progress.css('width').replace(/%|(px)|(pt)/,""));
		var ind = el.find(".indicator");
		var progress_interval = setInterval( function(){
			width ++;
			progress.css("width", width+"%");
			ind.text(width);
			if (width == value){
				clearInterval(progress_interval);
			}
		}, 5);
		return true;
	}
	return false;
}

function is_visible_init (){
	jQuery.fn.is_visible = function (){
		return ( jQuery(this).offset().top >= jQuery(window).scrollTop() ) && ( jQuery(this).offset().top <= jQuery(window).scrollTop() + jQuery(window).height() );
	}
}

function wp_image_popup(flag){
	if(jQuery("img[class*='wp-image']").parent("a").length){
		jQuery("img[class*='wp-image']").each(function(){
			var img_width = jQuery(this).width();
			var img_height = jQuery(this).height();

			if (!jQuery(this).hasClass("url")) {
				jQuery(this).parent("a").addClass("prettyPhoto");
			};

			jQuery(this).parent("a").addClass("wp-image-popup").attr("title" , "").append('<span class="kids_curtain">&nbsp;</span>').width(img_width)

			if(jQuery(this).hasClass("aligncenter")){
				jQuery(this).parent("a").addClass("aligncenter");
			}
			if(jQuery(this).hasClass("alignleft")){
				jQuery(this).parent("a").addClass("alignleft");
			}
			if(jQuery(this).hasClass("alignright")){
				jQuery(this).parent("a").addClass("alignright");
			}

		})
		
	}
}

function shiping_calc_button(){
	if(jQuery(".woocommerce-page .shipping_calculator .shipping-calculator-button").length){
		jQuery(".woocommerce-page .shipping_calculator .shipping-calculator-button").addClass("alt");
		jQuery(".woocommerce-page .shipping_calculator .shipping-calculator-button").click(function(){
			jQuery(this).toggleClass("active");
		})
	}

}


	/**/
	/* MARK */
	/**/
	jQuery(document).ready(function ($){
		$(".stars").ready(function (){
			var rtl = typeof cws_is_rtl == 'function' ? cws_is_rtl() : false;
			var stars_active = false;
			$(".woocommerce .stars").on("mouseover", function(){
				if (!stars_active){
					$(this).find("span:not(.stars-active)").append("<span class='stars-active' data-set='no'>&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;</span>");
					stars_active = true;
				}
			});
			$(".woocommerce .stars").on("mousemove", function (e){
				var width = $(this).width();
				var cursor = e.pageX;
				var ofs = $(this).offset().left;
				var fill = rtl ? width - ( cursor - ofs ) : cursor - ofs;
				var persent = Math.round(100*fill/width);
				$(".woocommerce .stars .stars-active").css("width",String(persent)+"%");
				$(".stars-active").removeClass("fixed-mark")
			});
			$(".woocommerce .stars").on("click", function (e){
				var width = $(this).width();
				var cursor = e.pageX;
				var ofs = $(this).offset().left;
				var fill = rtl ? width - ( cursor - ofs ) : cursor - ofs;
				var persent = Math.ceil( Math.round( 100 * ( fill/width ) ) / 20 ) * 20;
				var mark = $(this).find(".stars-active");
				mark.css('width',String(persent)+"%");
				mark.attr("data-set",String(persent));
			});
			$(".woocommerce .stars").on("mouseleave", function (e){
				var mark = $(this).find(".stars-active");
				if (mark.attr("data-set") == "no"){
					mark.css("width","0");
				}
				else{
					var persent = mark.attr("data-set");
					mark.css("width",String(persent)+"%");
					$(".stars-active").addClass("fixed-mark");
				}
			});
		});
	})

/* MARK */

/* portfolio */
jQuery('.page-content').on('click', '.pagenavi.gl a', function (e){
	PortfolioPage( e, 0 );
});

$.fn.WrapThis = function(arg1, arg2) { /*=Takes 2 arguments, arg1 is how many elements to wrap together, arg2 is the element to wrap*/

  var wrapClass = "column"; //=Set class name for wrapping element
  var itemLength = $(this).find(arg2).length; //=Get the total length of elements
  var remainder = itemLength%arg1; //=Calculate the remainder for the last array
  var lastArray = itemLength - remainder; //=Calculate where the last array should begin

  var arr = [];

  if($.isNumeric(arg1))
  {
      $(this).find(arg2).each(function(idx, item) {
          var newNum = idx + 1;

          if(newNum%arg1 !== 0 && newNum <= lastArray){
              arr.push(item);
          }
          else if(newNum%arg1 == 0 && newNum <= lastArray) {
              arr.push(item);
              var column = $(this).pushStack(arr);
              column.wrapAll('<div class="' + wrapClass + '"/>'); //=If the array reaches arg1 setting then wrap the array in a column
              arr = [];
          }
          else if(newNum > lastArray && newNum !== itemLength){ //=If newNum is greater than the lastArray setting then start new array of elements
              arr.push(item);
          }
          else { //=If newNum is greater than the length of all the elements then wrap the remainder of elements in a column
              arr.push(item);
              var column = $(this).pushStack(arr);
              column.wrapAll('<div class="' + wrapClass + '"/>');
              arr = []
          }
      });
  }
}

/**/
/* google map */
/**/
function init_map()
{
	var delta
	var coordLat = -37.81261128155935;
	var coordLng = 144.96260404586792;
	if( jQuery(window).width() < 756 )
	{
		delta = 0;
	}
	
	var point = new google.maps.LatLng(coordLat,coordLng);
	var center = new google.maps.LatLng(coordLat,coordLng);
	
	var mapOptions = {	
		zoom: 15,
		center: center,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var image = 'images/gmap_default.png';
  var beachMarker = new google.maps.Marker({
  	map: map,
  	position: point
  });
}


if ($(".contact-form").length) {
	/**/
	/* contact form */
	/**/

	/* validate the contact form fields */      
	$(".contact-form").validate(  /*feedback-form*/
	{
	  onkeyup: false,
	  onfocusout: false,
	  errorElement: 'p',
	  errorLabelContainer: $(".message_box.error-box"),
	  rules:
	  {
	    name:
	    {
	      required: true
	    },
	    email:
	    {
	      required: true,
	      email: true
	    },
	    message:
	    {
	      required: true
	    }
	  },
	  messages:
	  {
	    name:
	    {
	      required: 'Please enter your name',
	    },
	    email:
	    {
	      required: 'Please enter your email address',
	      email: 'Please enter a VALID email address'
	    },
	    message:
	    {
	      required: 'Please enter your message'
	    }
	  },
	  invalidHandler: function()
	  {
	    $(".message_box.error-box").slideDown('fast');
	    $("#feedback-form-success").slideUp('fast');

	  },
	  submitHandler: function(form)
	  {   
	    $(".message_box.error-box").slideUp('fast');  
	    var $form = $(form).ajaxSubmit();
	    submit_handler($form, '#email_server_responce');
	  }
	});

	/* Ajax, Server response */ 
	var submit_handler = function(form, wrapper){

	  var $wrapper = $(wrapper); //this class should be set in HTML code
	  
	  $wrapper.css("display","block");
	  var data = {
	    action: "email_server_responce",
	    values: $(form).serialize()
	  };
	  //send data to server
	  $.post("php/contacts-process.php", data, function(s_response) {
	    s_response = $.parseJSON(s_response);
	    if(s_response.info == 'success'){
	      $wrapper.addClass("message message-success").append("<div class='message_box success-box'><div class='message_box_header'>Success Box</div><p>Your message was sent successfully.</p></div>");
	      $wrapper.delay(5000).hide(500, function(){
	        $(this).removeClass().text("").fadeIn(500);
	        $wrapper.css("display","none");
	      });
	      $(form)[0].reset(); 
	    } else { 
	      $wrapper.addClass("message message-error").append("<div class='message_box error-box'><div class='message_box_header'>Error Box</div><p>Server fail! Please try again later!</p></div>");
	      $wrapper.delay(5000).hide(500, function(){
	        $(this).removeClass().text("").fadeIn(500);
	        $wrapper.css("display","none");
	      });
	    }
	  });
	return false;
	}
}

/* add class type */
jQuery(document).ready(function($){
	var type_p = $("body").attr("data-type-of-widget");
	
	$('.entry-container .widget').addClass('type-'+type_p);
	$('.entry-container .widget.type-'+type_p).each(function(){
		var checker = $(this).find('h3').text();
		if ( checker == '' ){

			$(this).removeClass('type-'+type_p);
		}
	});
});

/* shop */

if ( $("#ship-to-different-address-checkbox").length ) {
	$("#ship-to-different-address-checkbox").click(show_address)
	show_address()
}

function show_address () {
	if ( document.getElementById("ship-to-different-address-checkbox").checked ) {
		$(".shipping_address").show();
	} else {
		$(".shipping_address").hide();
	}
}
if ( $(".woocommerce-checkout").length ) {
	$(".input-radio").click(function(){
		$(".payment_box.payment_method_paypal").slideUp(400);
		$(".payment_box.payment_method_bacs").slideUp(400);
		$(".payment_box.payment_method_cheque").slideUp(400);
		switch (true) {
			case document.getElementById("payment_method_bacs").checked:
				$(".payment_box.payment_method_bacs").slideDown(400)
				break
			case document.getElementById("payment_method_cheque").checked:
				$(".payment_box.payment_method_cheque").slideDown(400)
				break
			case document.getElementById("payment_method_paypal").checked:
				$(".payment_box.payment_method_paypal").slideDown(400)
				break
		}
	})
	
}

/**/
/* isotop */
/**/
jQuery(window).load(function (){
  if ($(".isotope").length) {  
    /**/
    /* ISOTOP  load */
    /**/
    var $container = $('.isotope');
    // init
    $container.isotope({
      // options
      itemSelector: '.iso-item',
    });
      // filter isotope on initalise
    if(jQuery('.filter-wrapper .filter').length){
    	
        
var selector = document.querySelector('select.filter').value;
        $container.isotope({ filter: selector });
    }

    $('.filter-wrapper').on('change', 'select.filter', function() { 
      $('.isotope').isotope(
      {
        filter: $(this).val()
      });
      return false;
    });
  }
})
jQuery(window).resize(function(){
	if ($(".isotope").length) {  
    /**/
    /* ISOTOP  load */
    /**/
    $('.isotope').isotope({
      masonry: {}
    });
  }
})

/**/
/***********   twitter   ********/
/**/
/**/
/*  widget carousel function  */
/**/
var woocommerce_price_slider_params = {"currency_symbol":"\u00a3","currency_pos":"left","min_price":"","max_price":""};
$(document).ready(function() {
  $('.twitter-carousel').tweet({
    username: 'Creative_WS',
    count: 6,
    loading_text: 'loading twitter feed...',
    template: "<div class='icon_frame'><i class='fa fa-twitter fa-2x'></i></div><div><p>{join}{text}<br>{time}</p></div>"
  });

  $('.top-panel .latest_tweets').tweet({
    username: 'Creative_WS',
    count: 1,
    loading_text: 'loading twitter feed...',
    template: "<div class='icon_frame'><i class='fa fa-twitter fa-2x'></i></div><div><p>{join}{text}<br>{time}</p></div>"
  });
	  

	/* wrap tweet list for 3 elements */
  $('aside .twitter-carousel .tweet_list').WrapThis(2, 'li');
  $('aside .twitter-carousel .tweet_list').each(function (){
    $(this).owlCarousel({
    singleItem:true,
    slideSpeed: 700,
    navigation: false,
    pagination: true
    });
  });

  /* wrap tweet list for 3 elements */
  $('.footer .twitter-carousel .tweet_list').WrapThis(3, 'li');
  $('.footer .twitter-carousel .tweet_list').each(function (){
    $(this).owlCarousel({
    singleItem:true,
    slideSpeed: 700,
    navigation: false,
    pagination: false
    });
    var owl = jQuery(this);
    jQuery(this).parents(".cws-widget-content").find(".widget_carousel_nav").each(function (){
      jQuery(this).children(".next").click(function(){
        owl.trigger('owl.next');
      })
      jQuery(this).children(".prev").click(function (){
        owl.trigger('owl.prev');
      });
    });
  });


	if(jQuery('.flickr-badge').length) {
		jQuery('.flickr-badge').jflickrfeed({
			limit: 6,
			qstrings: {
			id: '87563966@N05'
		},
		itemTemplate: '<li><a href="http://www.flickr.com/photos/87563966@N05"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
		}, function() {});
	}
					
})