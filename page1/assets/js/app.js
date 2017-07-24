$(function() {
    $('.js-goal-trigger').on('click', function() {
    	$('.goal.goal--is-disabled:first').removeClass('goal--is-disabled');
    });
});

$(window).on('load', function () {
		$('[data-bg]').each(function(i){
  		console.log($(this).data('bg'));
  		$(this).css('background-image', 'url(' + $(this).data('bg') + ')' );
  	});
});
