jQuery(function($){
  var $boxes = $('.fbox');
  $boxes.each(function(){
    var $box = $(this);
    $('*', $box)
      .filter(':input')
      .focus(function(){
        $boxes.removeClass('active');
        $box.addClass('active');
      });
  
    //if we detect a message container, make it active
    $box.has('.message_container').filter(':first').addClass('active');
    
    //if we detect facebook in eula format, make it active
    $('#facebook').has('.eula').addClass('active');
  });
  
  //fix built in Java HTML
  $('#create .eula > span').wrap('<label for="accepteula" />');
  $('#gen_login .username_con label').text('Email');
  $('#gen_login .password_con label').text('Password');
  $('#create .user_name label').text('Email');
  $('#gen_login .retrieve_password_link a').addClass('reset_password').prependTo('#gen_login .actions_con');
  $('#gen_login .retrieve_password_link').remove();
  
  
  var QueryString = function(){
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]], pair[1] ];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    } 
    return query_string;
  }();
  
  if(typeof QueryString.project_id != "undefined"){
    $('<input type="hidden" name="project_id" />').val(QueryString.project_id).appendTo('#create_account form');
  }
  if(typeof QueryString.store_id != "undefined"){
    $('<input type="hidden" name="store_id" />').val(QueryString.store_id).appendTo('#create_account form');
  }
  
  $('#create input[name=ret]').each(function(){
    if($(this).val().indexOf('type') > -1) return;
    var sep = ($(this).val().indexOf('?') > -1 ? '&' : '?');
    $(this).val($(this).val() + sep + 'type=new-account');
  });
});