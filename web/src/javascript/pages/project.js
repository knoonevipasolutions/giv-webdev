(function($, global){
	var EVT_TAB_SHOW = 'tab-show';

	if (global.cms && global.cms.TabContainer) {
		var oldShowElement = global.cms.TabContainer.prototype.showElement;
		global.cms.TabContainer.prototype.showElement = function(el) {
			oldShowElement.apply(this, arguments);
			$(el).trigger(EVT_TAB_SHOW);
		};
	}

	$(function(){
	  var store_url = $('#featured_stores .stores').data('source');
	  var project_id = $('#content .project').data('id');
	  var $user_account = $('#user-account');

	  //hide the contribution tab if no content
	  if($('#contribute #direct .give_directly').length == 0){
	    $('#direct_tab').hide();
	  }

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


	  //contribution button
	  $('.action.give_directly a.sbutton').click(function(evt){
	    evt.preventDefault();
	    $.fancybox($('#contribution_form'), {
	      autoSize: false,
	      maxWidth: 500,
	      minHeight: 50,
	      height: 'auto',
	      padding: 6,
	      title: 'Give Directly',
	      helpers:  {
	        title: {
	          position: 'top',
	          type: 'inside'
	        }
	      }
	    });
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
	    var $con = $('#contribution_form');
	    var $form = $('form', $con);
	    var $amount = $('input[name=amount]', $form);
	    var $other = $('input[name=suggest_other]', $form);
	    var $mc = $('<div class="message_container" />').prependTo($form.find('.inner')).hide();

	    $('input[name=suggestion]', $form).change(function(){
	      if($(this).val() < 0)
	        $other.focus();
	    });

	    var updateContribAmount = function(){
	      var val = parseFloat($('input[name=suggestion]:checked').val(), 10);
	      if(val < 0){
	        var other_val = $other.val().replace('$', '');
	        if(!other_val.length)
	          return {status: false, message: 'Please fill in the box with the amount you wish to contribute'};

	        other_val = (isNaN(parseFloat(other_val)) ? 0 : other_val);
	        if(other_val < 5){
	          return {status: false, message: 'The minimum contribution is $5.00'};
	        } else {
	          $amount.val(other_val);
	        }
	      } else {
	        $amount.val(val);
	      }

	      return {status: true, message: ''};
	    };

	    $form.submit(function(evt){
	      var result = updateContribAmount.call(this);
	      if(!result.status){
	        $mc.empty().show();
	        $('<div class="message error"></div>').text(result.message).appendTo($mc);
	        $.fancybox.update();
	      }
	      return result.status;
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