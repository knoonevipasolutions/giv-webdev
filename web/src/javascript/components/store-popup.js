jQuery(function($){
  var $redirect_form = $('.redirect_form form');
  var $store_field = $('input[name=store]', $redirect_form);
  
  $('.store .sbutton, .store .tile_link').click(function(evt){
    evt.preventDefault();
    $store_field.val($(this).closest('.store').data('id'));
    $redirect_form.submit();
  });
});