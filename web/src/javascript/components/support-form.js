jQuery(function($){
  $('.it_form').each(function(){
    var $con = $(this);
    var $mc = $('<div class="message_container" />');
    var $errors = $('.validation_error', $con);
    
    if($errors.length)
      $mc.prependTo($con);
    
    $errors.each(function(){
      $('<div class="message error" />').text($(this).find('label').text() + ' is required').appendTo($mc);
    });
  });
});