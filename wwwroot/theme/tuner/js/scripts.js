/**/
/* on load event */
/**/
"use strict";
jQuery(document).ready( function (){


	

	jQuery('#tuner-switcher').on('click', function()
	{
		jQuery('#tuner').toggleClass('tuner-visible');
	});

	jQuery('.color-picker').each( function(){
		var el = jQuery(this);
		var def_color = el.data( 'color' );
		var id = el.attr('id');
		var matches = /color-(\d+)/.exec( id );
		if ( matches != null ){
			var index = matches[1];
			var tuner_id = 'tuner-style-' + index;
			var style_id = 'cws-cp-' + index;
			var tuner_el = jQuery( '#' + tuner_id );
			var style_el = jQuery( '#' + style_id );
			if ( tuner_el.length && style_el.length ){
				
				el.ColorPicker({
					color: def_color,
					onShow: function(colpkr)
					{
						jQuery(colpkr).fadeIn(300);
						return false;
					},
					onHide: function(colpkr)
					{
						jQuery(colpkr).fadeOut(300);
						return false;
					},
					onChange: function (hsb, hex, rgb) {
						el.css('background-color', '#' + hex);
						tuner_el.find('span').text(hex);
						style_el.text(tuner_el.text());
					}
				});
			}

		}
	});

	jQuery('#tuner').on('click', '.patterns li', function()
	{
		var body_el, body_cls, matches, old_pattern, new_pattern_index, new_pattern;
		body_el = jQuery('body');
		body_cls = body_el.attr('class');
		matches = /t-pattern-(\d+)/.exec( body_cls );
		if ( matches != null ){
			old_pattern = matches[0];
			body_el.removeClass(old_pattern);
		}
		new_pattern_index = jQuery(this).data('pattern');
		new_pattern = "t-pattern-" + new_pattern_index;
		body_el.addClass(new_pattern);
	});
});