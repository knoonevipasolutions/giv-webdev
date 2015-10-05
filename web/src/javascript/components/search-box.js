jQuery(function($){
  $('.search_box').each(function(){
    var $con = $(this);
    
    $('.default', $con).click(function(evt){
      $(this).siblings('input').focus();
    });
    
    var checkContent = function(){
      if($(this).val().trim().length > 0) $(this).closest('.question').addClass('has_value');  
      if($(this).val().trim().length == 0) $(this).closest('.question').removeClass('has_value');  
    };
    
    $('.question', $con)
      .has('.default')
      .find('.field input')
      .focus(function(evt){
        checkContent.call(this);
      }).blur(function(evt){
        checkContent.call(this);
      }).keyup(function(evt){
        checkContent.call(this);
      }).change(function(evt){
        checkContent.call(this);
      }).each(function(){
        checkContent.call(this);
      });
  });
});