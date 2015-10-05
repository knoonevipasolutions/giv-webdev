cms.TabContainer.prototype.showTab = function(evt) {
  var selectedTabItem = this.getEventSource(evt, "li");
  if(jQuery(selectedTabItem).hasClass('disabled')) 
    return false;
  this._show(selectedTabItem, this.doPersistence);
  return false;
};


jQuery(function($){
  var $con = $('#projects');
  var $tis = $('.tab-items li', $con);
  
  $('.projects', $con).each(function(){
    var count = parseInt($(this).data('count'), 10);
    var $ti = $tis.eq($(this).closest('.tab-content').index() - 1);
    $ti.prepend('<span class="count">'+count+'</span>');
    if(count == 0){
      $ti
        .addClass('disabled')
        .click(function(evt){
          evt.preventDefault();
          evt.stopPropagation();
        });
    }
  });
});