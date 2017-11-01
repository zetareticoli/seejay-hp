$(document).ready(function(){
	$('.js-nav-toggle').click(function(){
		$(this).toggleClass('open');
    $('.js-nav-menu').toggleClass('is-visible');
    $('html').toggleClass('is-locked')
	});
});
