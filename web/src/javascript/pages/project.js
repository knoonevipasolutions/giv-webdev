(function($, global){
	var EVT_TAB_SHOW = 'tab-show';

	if (global.cms && global.cms.TabContainer) {
		var oldShowElement = global.cms.TabContainer.prototype.showElement;
		global.cms.TabContainer.prototype.showElement = function(el) {
			oldShowElement.apply(this, arguments);
			$(el).trigger(EVT_TAB_SHOW);
		};
	}

	$(document).ready(function() {
	  var store_url = $('#featured_stores .stores').data('source');
	  var project_id = $('#content .project').data('id');
		var $header = $('#header');
		var $scrollBody = $('html, body');

		$('.contribute-method').on('click', function(evt) {
			var $method = $(this);
			var newTop = $($method.attr('href')).offset().top - $header.height() - 20;

			evt.preventDefault();
			$scrollBody.animate({scrollTop: newTop}, 500);
		});

	  //shopping button
	  $('#shop .more a').fancybox({
	    type: 'iframe',
	    autoSize: false,
	    width: 765,
	    height: 585,
	    padding: 6,
	    title: 'Shop for the Project',
	    helpers:  {
	      title: {
	        position: 'top',
	        type: 'inside'
	      }
	    }
	  });

	  var setupPopupStoreChooser = function(){
	    var $con = $('.store_chooser');

	    if(!$con.length) return;

	    var $inputs = $('input[type=radio]', $con);
	    var $action = $('.action.shop .sbutton', $con);

	    $inputs.change(function(){
	      $inputs.closest('.option').removeClass('active');
	      if($(this).is(':checked')){
	        $(this).closest('.option').addClass('active');
	      }
	      $action.removeClass('dbutton');
	    }).filter(':checked').closest('.option').addClass('active');

	    $('form', $con).submit(function(){
	      return !$action.hasClass('dbutton');
	    });
	  };

	  //start shop now
	  $('.stores .store .tile_link').click(function(evt){
	    evt.preventDefault();

	    var $store = $(this).closest('.store');
	    var params = {
	      id: $store.data('id'),
	      pid: project_id
	    };

	    $.get(store_url, params, function(result){
	      $.fancybox($(result).find('#body > *').addClass('fancybox-content'), {
	        type: 'inline',
	        autoSize: false,
	        height: 'auto',
	        width: 400,
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

	  //contribution form management
	  (function(){
	    var $con = $('.contribute-form');
	    var $form = $con.find('form');
	    var $amount = $form.find('input[name=amount]');
	    var $other = $form.find('input[name=suggest_other]');
	    var $mc = $('<div class="message-container" />').prependTo($form.find('.inner')).hide();

		  function updateContributeAmount(){
			  var val = parseFloat($('input[name=suggestion]:checked').val(), 10);
			  if (val > 0) {
				  $amount.val(val);
			  } else {
				  var otherVal = $other.val().replace('$', '');

				  //if other val is selected and it has no content
				  if (!otherVal.length) {
					  return {
						  valueUpdated: false,
						  message: 'Please fill in the box with the amount you wish to contribute'
					  };
				  }

				  //attempt to parse string value to float
				  otherVal = (isNaN(parseFloat(otherVal)) ? 0 : otherVal);

				  //if other value is less than 5
				  if (otherVal < 5) {
					  return {
						  valueUpdated: false,
						  message: 'The minimum contribution is $5.00'
					  };
				  } else {
					  $amount.val(otherVal);
				  }
			  }

			  return {
				  valueUpdated: true,
				  message: ''
			  };
		  }

	    $form.find('input[name=suggestion]').change(function() {
	      if ($(this).val() < 0) {
			    $other.focus();
		    }
	    });

	    $form.submit(function(evt){
	      var result = updateContributeAmount.call(this);
	      if (!result.valueUpdated) {
	        $mc
		        .empty()
		        .show()
		        .append($('<div class="message error" />').text(result.message));
	      }
	      return result.valueUpdated;
	    });
	  })();



	  //gallery
	  $('.gallery .gi.video a').each(function(){
	    var $link = $(this);

	    var src = $(this).data('src');
	    src += (src.indexOf('?') > -1 ? '&' : '?') + 'scheme=https';
	    var params = {
	      q: 'SELECT * FROM json WHERE url="http://www.youtube.com/oembed?format=json&url='+encodeURI(src)+'" and itemPath="/"',
	      env: 'store://datatables.org/alltableswithkeys',
	      format: 'json',
	      scheme: 'https'
	    };
	    $.getJSON('//query.yahooapis.com/v1/public/yql?callback=?', params, function(result){
	      var video = result.query.results.json;
	      $link.attr('href', $(video.html).attr('src'));
	      $link.append($('<img alt="" />').attr({
	        src: video.thumbnail_url,
	        width: 240,
	        height: 180
	      }).css({
	        marginTop: -40,
	        marginLeft: -55
	      }));
	    });
	  });

	  $('.gallery .gi.image a').each(function(){
	    var $gi = $(this).closest('.gi');
	    var $img = $('img', this);
	    $img.css({
	      marginTop: ($gi.height() - $img.height()) / 2,
	      marginLeft: ($gi.width() - $img.width()) / 2
	    });
	  });

	  $('.gallery .gi a').fancybox({
	    padding: 6,
	    helpers: {
	      title: {
	        position: 'top',
	        type: 'inside'
	      }
	    }
	  });


	  //embed textarea
	  $('.embed_link textarea').click(function(evt){
	    $(this).select();
	  });

	  //embed preview
	  var $preview = $('.embed_link .preview');
	  $('.embed_link .toggle_preview').click(function(evt){
	    evt.preventDefault();
	    if($preview.is(':visible')){
	      $preview.hide();
	    } else {
	      $preview.show();
	    }
	  });

		$('.comments_tc').on(EVT_TAB_SHOW, function() {
			if (global.FB && global.FB.XFBML && FB.XFBML.parse) {
				global.FB.XFBML.parse(this);
			}
		});

	});

})(jQuery, window);