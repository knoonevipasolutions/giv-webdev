jQuery(function($){
  var $wizard = $('#wizard');
  if($wizard.length == 0) return;
  
  var $mis = $('.mi', $wizard);
  var $slides = $('.slide', $wizard);
  
  $('.action', $slides).hide();
  
  var showSlide = function(mi){
    var first_time = ($mis.filter('.active').length == 0);
    var $mi = $(mi);
    
    if($mi.is('.active')) return;
    
    var $new = $('.' + $mi.data('content'), $wizard);
    
    $mi.addClass('active').siblings().removeClass('active');
    
    $('.action', $slides).hide();
    $('.action', $new).show();
    
    $('.image', $slides).stop().animate({
      opacity: 0,
      left: -40
    }, 700, function(){
      $(this).not($new).hide();
      $new.show();
      
      
      $('.image', $new).show().css({
        opacity: 0,
        left: 30
      }).stop().animate({
        opacity: 1,
        left: 0
      }, 700);
      
      $('.content', $new).css({
        opacity: 0
      }).stop().animate({
        opacity: 1
      }, 200);
    });
    
    $('.content', $slides).stop().animate({
      opacity: 0
    }, 200);
    
    if(first_time){
      $new.show();
      
      $('.image', $new).css({
        opacity: 0,
        left: 30
      }).stop().animate({
        opacity: 1,
        left: 0
      }, 700);
      
      $('.content', $new).css({
        opacity: 0
      }).stop().animate({
        opacity: 1
      }, 200);
    }                                              
  };
  
  $mis.click(function(evt){
    evt.preventDefault();
    showSlide(this);
  }).hover(function(){
    showSlide(this);
  }, function(){
    
  }).eq(0).each(function(){
    showSlide(this);
  });

});