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

    // initialize the cart
    var cart = {};
    
    this.post('#/cart', function(context) {
      var item_id = this.params['item_id'];
      if (!cart[item_id]) {
        // this item is not yet in our cart
        // initialize its quantity with 0
        cart[item_id] = 0;
      }
      cart[item_id] += parseInt(this.params['quantity']);
      this.log("The current cart: ", cart);
    });
    
  });
  
  $(function() {
    app.run('#/');
  });
  
})(jQuery);