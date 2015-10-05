jQuery(function($){
  var $form = $('form.miwt_form');
  
  if(!$form.length) return;
  
  var updateUI = function(){
    
    $('.cal input.miwt_calendar', $form).datepicker({
      showOn: "button",
      buttonImage: "/resources/dyn/files/184118zd8e96183/_fn/calendar-icon.png"
    });
  };
  
  $form.get(0).submit_options = {
    postUpdate: updateUI
  };
  
  updateUI();
});