$(window).on('load', function () {
		$('[data-bg]').each(function(i){
  		console.log($(this).data('bg'));
  		$(this).css('background-image', 'url(' + $(this).data('bg') + ')' );
  	});
});
