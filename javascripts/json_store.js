(function($) {
  
  var app = $.sammy(function() {
    this.element_selector = '#main';    
    this.use(Sammy.Template);

    this.get('#/', function(context) {
      $.ajax({
        url: 'data/items.js', 
        dataType: 'json',
        success: function(items) {
          $.each(items, function(i, item) {
            context.log(item.title, '-', item.artist);
          });
        }
      });
    });
    
  });
  
  $(function() {
    app.run('#/');
  });
  
})(jQuery);