jQuery(function($){
  var $con = $('#intro .start_video');
  var $overlay = $('.overlay', $con);
  var $show = $('.show', $con);
  var $video = $('.video', $con);
  var $vc = $('.video .content', $con);
  var $embed = $('.embed_video', $con);
  var $close = $('.close', $con);
  
  $show.click(function(evt){
    evt.preventDefault();
    
    $overlay.show().css('opacity', 0).stop().fadeTo(300, 1);
    $close.show().css('opacity', 0).stop().fadeTo(300, 1);
    $video.stop().animate({
      bottom: 23
    });  
    $embed.css('display', 'block');
    $vc.show();
    $show.css('opacity', 1).stop().fadeTo(300, 0, function(){
      $show.hide(); 
    });
    
  });
  
  $close.click(function(evt){
    $overlay.show().css('opacity', 1).stop().fadeTo(300, 0, function(){
      $overlay.hide(); 
    });
    $close.show().css('opacity', 1).stop().fadeTo(300, 0, function(){
      $close.hide(); 
    });
    $video.stop().animate({
      bottom: -382
    }, function(){
      var temp = $embed.attr('src');
      $embed.hide().attr('src','').attr('src', temp); 
      $vc.hide();
    });                               
    $show.show().css('opacity', 0).stop().fadeTo(300, 1);    
  });
});