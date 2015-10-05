jQuery(document).ready(function($){
  var $btn = $('.ordercomplete button.print_invoice');
  var t = $btn.text();
  $btn.empty();
  $btn.addClass('cbutton');
  $btn.append('<span class="text" />').text(t);
});