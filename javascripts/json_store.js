(function($) {
  
  var app = $.sammy(function() {
    this.element_selector = '#main';    

    this.get('#/', function(context) {
      context.log('Yo yo yo');
    });
    
  });
  
  $(function() {
    app.run('#/');
  });
  
})(jQuery);