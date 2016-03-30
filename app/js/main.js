/* global Materialize */
/* global $ */
/* global jQuery */
$(document).ready(function () {
	convertIconToSvg();

	activateMailChimpForm();

	$('a[href*="#"]').on('click', function (e) {
		// prevent default action and bubbling
		e.preventDefault();
		e.stopPropagation();
		// set target to anchor's "href" attribute
		var target = $(this).attr('href');
		// scroll to each target
		$(target).velocity('scroll', {
			duration: 500,
			offset: -40,
			easing: 'ease-in-out'
		});
	});

	$(".more-from-app-slider").slider({ height: '600px', interval: 2000 });
	$('.more-from-app-slider').slider('pause');
	$(".live-score-slider").slider({ height: '600px', interval: 2000 });
	$('.live-score-slider').slider('pause');
	$('.connect-with-friends-slider').slider({ height: '600px', interval: 2000 });
	$('.connect-with-friends-slider').slider('pause');

	var options = [
		{ selector: '.connect-with-friends-slider', offset: 50, callback: 'startConnectSlider()' },
		{ selector: '.live-score-slider', offset: 50, callback: 'startLiveScoreSlider()' },
		{ selector: '.more-from-app-slider', offset: 50, callback: 'startMoreFromAppSlider()' },
	];
	Materialize.scrollFire(options);

	$('.content-row .section h5').click(function (e) {
		e.preventDefault();
		var index = $(this).attr('data-attr') ? $(this).attr('data-attr') : $(this).closest('.section').index();
		var slider = $(this).closest('.content-row').find('.slider');
		$(slider).slider('goTo', index);
	});

});

function register($form) {
	$.ajax({
		type: $form.attr('method'),
		url: $form.attr('action'),
		data: $form.serialize(),
		cache: false,
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
	}).done(function () {
		$('.result').html('Thanks for your interest.').removeClass('hide');
		$("#mce-EMAIL").val('');
	});
}


function activateMailChimpForm() {
	var $form = $('#mc-embedded-subscribe-form');

	$('#mc-embedded-subscribe').on('click', function (event) {
		if (event) event.preventDefault();
		// if(validate_input($form)) {
		// 	register($form);
		// }
		register($form);
	});
}

function startConnectSlider() {
	$('.connect-with-friends-slider').slider('start');
}
function startLiveScoreSlider() {
	$('.live-score-slider').slider('start');
}
function startMoreFromAppSlider() {
	$('.more-from-app-slider').slider('start');
}

function convertIconToSvg() {
	jQuery('img.svg').each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		jQuery.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');
			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
			}
			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');
			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}
			// Replace image with new SVG
			$img.replaceWith($svg);
		}, 'xml');
	});
}