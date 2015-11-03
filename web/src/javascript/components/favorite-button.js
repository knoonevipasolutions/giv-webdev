jQuery(function($) {

	var API_URL = '/partial/ajax/add_to_favorites';
	var GUEST_URL = '/popup/favorite-guest';

	var CSS_CLASS_GUEST_BUTTON = 'fav_guest';
  var CSS_CLASS_FAV_ADD = 'fav_add';
  var CSS_CLASS_FAV_REMOVE = 'fav_remove';

	var actionInProgress = false;

	function initFavButton() {
		var $favorite = $(this);
		$favorite
			.addClass('tooltip_popup_parent')
			.append('<span class="tooltip_popup"><span class="arrow" /><span class="message" /></span>')
			.find('.message')
			.text($favorite.data('tooltipMessage'));
	}

  //add to favorites button
  function updateFavStatus() {
    var $favorite = $(this);
    $favorite.removeClass([CSS_CLASS_FAV_ADD, CSS_CLASS_FAV_REMOVE].join(' '));

    switch ($favorite.data('action')) {
      case "remove":
        $favorite.addClass(CSS_CLASS_FAV_REMOVE);
        break;
      case "add":
      default:
        $favorite.addClass(CSS_CLASS_FAV_ADD);
        break;
    }
  }

  $('.fav_action_button')
	  .each(initFavButton)
	  .filter(':not(.' + CSS_CLASS_GUEST_BUTTON + ')')
	  .each(updateFavStatus)
	  .on('click', function(evt) {
	    evt.preventDefault();

		  //Make sure no existing action is waiting
	    if (actionInProgress) {
		    return;
	    }

	    actionInProgress = true;

		  var favorite = this;
	    var $favorite = $(favorite);
	    var action = $favorite.data('action');
		  var type = $favorite.data('type');
	    var $tooltip = $favorite.find('.tooltip_popup .message');
		  var apiParams;

		  switch (type) {
			  case 'project':
				  apiParams = {
					  project: $favorite.closest('.project').data('id'),
					  action: action
				  };
				  break;
			  case 'store':
				  apiParams = {
					  store: $favorite.closest('.store').data('id'),
					  action: action
				  };
				  break;
		  }

		  //Just exit if no API params are defined
		  if (!apiParams) {
			  return;
		  }

	    $tooltip.empty().append('<span class="loading" />');

	    $.post(API_URL, apiParams, function(result) {
	      var resultText = $(result).text();
		    var feedbackMsg = '';

	      switch(resultText) {
	        case 'success':
	          switch(action){
	            case "remove":
		            feedbackMsg = 'Removed from your favorites, click to add';
	              $favorite.data('action', 'add');
	              break;
	            case "add":
	            default:
		            feedbackMsg = 'Added to your favorites, click to remove';
	              $favorite.data('action', 'remove');
	              break;
	          }
	          break;
	        case 'invalid_user':
		        feedbackMsg = 'Must be logged in to add';
	          break;
	        case 'at_capacity':
		        feedbackMsg = 'Could not add, already at max allowed';
	          break;
	        case 'invalid_project':
	        default:
		        feedbackMsg = 'There was an error adding to your favorites, please try again later';
	      }

		    $tooltip.empty().text(feedbackMsg);

	      updateFavStatus.call(favorite);

		    actionInProgress = false;
	    });
	  });
  
  //favorite button if guest
  $('.fav_action_button.fav_guest').on('click', function(evt) {
    var projectId = $(this).closest('.project').data('id');
    evt.preventDefault();
    $.fancybox(GUEST_URL + '?project_id='+encodeURIComponent(projectId)+'&ret='+encodeURIComponent(window.location.pathname), {
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