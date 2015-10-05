jQuery(function($){
  var $redirect_form = $('.redirect_form form');
  var $team_field = $('input[name=team]', $redirect_form);
  
  $('.teams .action.join').click(function(evt){
    $team_field.val($(this).closest('.team').data('id'));
    
    var $button = $('.button.add', this);
    var $loading = $('<div class="loading button" />').insertAfter($button).hide();
    
    $loading.show();
    $button.hide();

    $.post('/partial' + $redirect_form.attr('action'), $redirect_form.serialize(), function(result){
      $loading.hide();
      var result = $(result).text();
      switch(result){
        case 'success':
          $('<div class="message">Added</div>').insertAfter($loading); 
          break;
        case 'invalid_user':
          $('<div class="message error">Must be logged in to join</div>').insertAfter($loading); 
          break;
        case 'invalid_team':
          $('<div class="message error">Could not join the team</div>').insertAfter($loading); 
          break;
        default:
          $('<div class="message error">There was an error joining the team, please try again later</div>').insertAfter($loading); 
      }
    });    
    
  });  
});