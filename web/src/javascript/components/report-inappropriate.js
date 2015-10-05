jQuery(function($){
  
  var $form = $('#report form.miwt_form');
  
  if(!$form.length) return;
  
  var initForm = function(){
    var url = getParameterByName('url');
    if(url.length)
      $('.report_link input', $form).val(url).prop('disabled', true);   
  };
  
  var getParameterByName = function(name){
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  };
  
  $form.get(0).submit_options = {
    postUpdate: initForm
  };
  
  initForm();
  
});