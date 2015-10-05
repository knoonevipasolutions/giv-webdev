jQuery(function($){
  
  $('#start .actions .dbutton').click(function(evt){
    evt.preventDefault();
  });
  
  //if the browser is chrome, show specific chrome extension download buttons  
  if(navigator.userAgent.indexOf('Chrome') > -1){
    $('#start .actions .download_chrome').css('display', 'inline-block');
    $('#start .actions .download_all').hide();
  }
});
