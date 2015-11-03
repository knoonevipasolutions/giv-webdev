jQuery(function($){
  
  var $con = $('.search_listing .stores');
  if (!$con.length)
    $con = $('#featured_stores .stores');
  var url = $con.data('source');
  
  function setupPopupStoreChooser() {
    var $con = $('.store_chooser');
    
    if(!$con.length) return;
    
    var $inputs = $('input[type=radio]', $con);
    var $action = $('.action.shop .sbutton', $con);
    
    //$inputs.change(function(){
    $('.option', $con).click(function(evt){
      $('input', this).prop('checked', true);
      $(this).addClass('active').siblings().removeClass('active');
      $action.removeClass('dbutton');
    });
    
    $('form', $con).submit(function(){
      return !$action.hasClass('dbutton');
    });
  }
  
  //start shop now
  $('.stores .store .shop .sbutton, .stores .store .tile_link').click(function(evt) {
    evt.preventDefault();
    
    var $store = $(this).closest('.store');
    var id = $store.data('id');
    
    $.get(url, {id: id}, function(result){
      $.fancybox($(result).find('#body > *').addClass('fancybox-content'), {
        type: 'inline',
        autoSize: false,
        height: 'auto',
        width: 800,
        padding: 6,
        title: 'Shop at ' + $store.find('.name').text(),
        helpers:  {
          title: {
            position: 'top',
            type: 'inside'
          }
        }
      });
      
      setupPopupStoreChooser();
      
    });
  });
  
});