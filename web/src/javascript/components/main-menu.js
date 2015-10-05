jQuery(function($){
  $('#main_nav > .menu > .mi > .menuitemlabel > .mil').each(function(){
    $(this).html($(this).text().replace(/^([^\s]+)/, "<span class=\"hl\">$1</span>"));
  });
});
