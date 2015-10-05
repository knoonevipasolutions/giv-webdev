jQuery(function($){
  
  //add to favorites button
  var updateFavStatus = function(){
    var $favorite = $(this);
    $favorite.removeClass('fav_add fav_remove');
    switch($favorite.data('favStatus')){
      case "remove":
        $favorite.addClass('fav_remove');
        break;
      case "add":
      default:
        $favorite.addClass('fav_add');
        break;
    };  
  };
  
  var favorite_is_adding = false;
  $('.fav_action_button').filter(':not(.fav_guest)').each(function(){
    updateFavStatus.call(this);
  }).click(function(evt){
    evt.preventDefault();
    
    if(favorite_is_adding) return;
    favorite_is_adding = true;
    
    var $favorite = $(this);
    var action = $favorite.data('favStatus');
    var $tooltip = $('.tooltip_popup .message', $favorite);
    
    var params = {
      project: $(this).closest('.project').data('id'),
      action: action
    };
    
    $tooltip.empty().append('<span class="loading" />');
    
    $.post('/partial/ajax/add_to_favorites', params, function(result){
      favorite_is_adding = false;
      
      $tooltip.empty();
      
      var result = $(result).text();
      switch(result){
        case 'success':
          switch(action){
            case "remove":
              $tooltip.text('Project removed from your favorites, click to add'); 
              $favorite.data('favStatus', 'add');
              break;
            case "add":
            default:
              $tooltip.text('Project added to your favorites, click to remove'); 
              $favorite.data('favStatus', 'remove');
              break;
          };
          break;
        case 'invalid_user':
          $tooltip.text('Must be logged in to add'); 
          break;
        case 'at_capacity':
          $tooltip.text('Could not add, already at max allowed'); 
          break;
        case 'invalid_project':
        default:
          $tooltip.text('There was an error adding the project to your favorites, please try again later'); 
      }
      
      updateFavStatus.call($favorite);
    });
  });
  
  //favorite button if guest
  $('.fav_action_button.fav_guest').click(function(evt){
    var project_id = $(this).closest('.project').data('id');
    evt.preventDefault();
    $.fancybox('/popup/favorite-guest?project_id='+project_id+'&ret='+window.location.pathname, {
      type: 'iframe',
      autoSize: false,
      maxWidth: 500,
      minHeight: 175,
      height: 'auto',
      padding: 6,
      title: 'Login Required',
      helpers:  {
        title: {
          position: 'top',
          type: 'inside'
        }
      }
    });
  });

});