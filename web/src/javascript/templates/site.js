jQuery(function($){
  
  if($('.ieonly').length) $('body').addClass('ieonly');

  var $user_account = $('#user-account');
  
  var getCookie = function(name) {
    var i=0,c,cn=name+"=",ca=document.cookie.split(';');
    for(;c=ca[i];i++) {
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(cn) == 0) return c.substring(cn.length,c.length);
    }
    return null;
  };
  
  var setCookie = function(name, value, expires, path, domain, secure) {
    document.cookie=name+"="+escape(value)+
      ((expires)?"; expires="+expires.toGMTString():"")+
      ((path)?"; path="+path : "")+
      ((domain)?"; domain="+domain:"")+
      ((secure)?"; secure" : "");
  };
  
  var $new_account_popup = $('#new_account_popup');
  var $getting_started_popup = $('#getting_started_popup');
  var $plugin_reminder_popup = $('#plugin_reminder_popup');
  var crossrider_id = '14292';
  
  //user not logged in
  if($user_account.length == 0 && $getting_started_popup.length > 0){
    $.fancybox($getting_started_popup, {
      autoSize: false,
      maxWidth: 800,
      minHeight: 0,
      height: 'auto',
      padding: 6,
      title: 'Getting Started with Kambit',
      helpers: {
        title: {
          position: 'top',
          type: 'inside'
        }
      }
    });     
  }
  
  //new user popup
  if($user_account.length > 0  && $new_account_popup.length > 0){
    //get Crossrider API
    $.fancybox.showLoading();
    $.getScript('//w9u6a2p6.ssl.hwcdn.net/plugins/javascripts/crossriderAPI.js').then(function(){
      if(!CrossriderAPI) return;
      
      CrossriderAPI.isAppInstalled(crossrider_id, function(is_installed){
        $.fancybox.hideLoading();
        if(!is_installed){
          $.fancybox($new_account_popup, {
            autoSize: false,
            maxWidth: 580,
            minHeight: 0,
            height: 'auto',
            padding: 6,
            title: 'Welcome to Kambit!',
            helpers: {
              title: {
                position: 'top',
                type: 'inside'
              }
            }
          });
        }
      }); 
    });
  }
  
  //returning user popup
  if($user_account.length > 0 && $new_account_popup.length == 0  && !getCookie('popup_reminder')){
    $.getScript('//w9u6a2p6.ssl.hwcdn.net/plugins/javascripts/crossriderAPI.js').then(function(){
      if(!CrossriderAPI) return;
      
      CrossriderAPI.isAppInstalled(crossrider_id, function(is_installed){
        if(!is_installed){
          $plugin_reminder_popup.appendTo('body').show().animate({
            right: 0
          });
          
          $('a.download_all', $plugin_reminder_popup).click(function(evt){
            evt.preventDefault();
          });
          
          $('.close', $plugin_reminder_popup).click(function(evt){
            $plugin_reminder_popup.stop().animate({
              right: -350
            }, function(){ $(this).remove(); });
            expireTime = new Date();
            expireTime.setHours(expireTime.getHours()+1);
            setCookie('popup_reminder', 'noshow', expireTime, '/' );
          });
        }
      }); 
    });    
  }
  
  $('#new_account_popup .download_all').click(function(evt){
    evt.preventDefault();
  });
  
  $('#new_account_popup .skip').click(function(evt){
    $.fancybox.close();
  });
  
  //if the browser is chrome, show specific chrome extension download buttons
  if(navigator.userAgent.match(/Chrome/)){
    $('.plugin_popup .download_chrome').css('display', 'inline-block');
    $('.plugin_popup .download_all').hide();
  }
});