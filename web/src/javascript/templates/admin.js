jQuery(function($){
  var $form = $('form.miwt_form');
  
  if(!$form.length) return;
  
  var updateUI = function(){
    
    $('.cal input.miwt_calendar', $form).each(function(){
      $(this).datepicker({
        showOn: "button",
        buttonImage: "/resources/dyn/files/184118zd8e96183/_fn/calendar-icon.png"
      });
    })
    
    var $purl_text = $('.purl .purl_prefix');
    $purl_text.text($purl_text.text().replace('release-kambit.vipasuite.com', 'www.kambit.com'));
    
    $('.image_gallery .richlist .element img').one('load', function(){
      var $ei = $(this).closest('.image');
      var $img = $(this);
      $img.css({
        marginTop: ($ei.height() - $img.height()) / 2,
        marginLeft: ($ei.width() - $img.width()) / 2
      });
    }).each(function(){
      if(this.complete) $(this).load();
    }); 
    
  };
  
  var old_submit_options = false;
  if(typeof $form.get(0).submit_options != "undefined"){
    old_submit_options = $form.get(0).submit_options;
  }
  $form.get(0).submit_options = {
    postUpdate: function(){
      if(old_submit_options) old_submit_options.postUpdate();
      updateUI();
    }
  };
  
  updateUI();
});