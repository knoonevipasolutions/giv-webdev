(function($){
  cms.TabContainer.prototype.showElement = function(el){
    $(el).stop().fadeTo(500, 1);
  };
    
  cms.TabContainer.prototype.hideElement = function(el){
    $(el).stop().fadeTo(500, 0, function(){ $(this).hide(); });
  };
})(jQuery);

jQuery(function($){
  
  $('.featured_banners').each(function(){
    var $con = $(this);
    var tc;
    var $tis = $('.tab-items li', $con);
    var $bar = $('<div class="progress" />').appendTo($con);
    
    var showTab = function(idx){
      tc.setActiveTab(idx);
      $bar.stop().css({
        width: '0%'
      }).animate({
        width: '100%'
      }, 4500, function(){
        nextTab();  
      });
    };
    
    var nextTab = function(){
      var cur = $tis.filter('.tab-selected').index();
      var next = (cur >= ($tis.length - 1) ? 0 : cur+1);
      showTab(next);
    };
    
    for(var i=0; i<cms.tabcontainers.length; i++){
      if(this == cms.tabcontainers[i].container)
        tc = cms.tabcontainers[i];
    }  
    
    if($tis.length == 1){
      $tis.closest('div.tab-items').hide(); 
      return;
    } 
       
    $tis.click(function(evt){
      evt.preventDefault();
      showTab($(this).index());
    });     
    
    showTab(0);
  });
});