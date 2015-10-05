jQuery(function($){
  $('#intro .menu a').addClass('sbutton');
  $('#intro #create_links .menu a').addClass('cbutton');
  $('#intro .more_link').click(function(evt){
    evt.preventDefault();
    
    $('html, body').animate({
      scrollTop: $('#content_blocks').position().top
    });
  });
});