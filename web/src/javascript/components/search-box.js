jQuery(function($) {
  $('.search_box').each(function() {
    var $con = $(this);
    
    $con.find('.default').on('click', function(evt) {
      $(this).siblings('input').focus();
    });
    
    function checkContent() {
	    var contentVal = $(this).val().trim();
	    var $question = $(this).closest('.question');
      if (contentVal.length > 0) {
	      $question.addClass('has_value');
      }
      if (contentVal.length == 0) {
	      $question.removeClass('has_value');
      }
    }
    
    $con.find('.question')
      .has('.default')
      .find('.field input')
      .on('focus blur keyup change', checkContent)
      .each(checkContent);
  });
});