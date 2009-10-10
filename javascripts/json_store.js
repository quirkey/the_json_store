(function($) {
  
  var app = $.sammy(function() {
    this.element_selector = '#main';    
    this.use(Sammy.Template);

    this.before(function() {
      // load the items
      var context = this;
      $.ajax({
        url: 'data/items.js', 
        dataType: 'json',
        async: false,
        success: function(items) {
          context.items = items;
        }
      });
    });

    this.get('#/', function(context) {
      context.app.swap('');
      $.each(context.items, function(i, item) {
        context.partial('templates/item.template', {id: i, item: item}, function(rendered) {
          context.$element().append(rendered);
        });
      });
    });
    
    this.get('#/item/:id', function(context) {
      this.item = this.items[this.params['id']];
      if (!this.item) { return this.notFound(); }
      this.partial('templates/item_detail.template');
    });
    
  });
  
  $(function() {
    app.run('#/');
  });
  
})(jQuery);