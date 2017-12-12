var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    this.set({like: !this.get('like')});
    console.log(this.get('like'));
    console.log('you clicked the like button');
  }
});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
    //this.on('change', this.sortByField, this);
  },

  comparator: 'title',

  sortByField: function(field) {
    comparator = field;
    console.log(comparator);
    var sorted = this.models.sort(function(a, b) {
      if (field === 'title') {
        var numArray = [];
        console.log('trying to find this.models');
          console.log(this.collection);
        for (var i = 0; i < this.models.length; i++) {
          var thisNum = [];
          for (var j = 0; j < this.models[i].length; j++) {
            thisNum.push(this.models[j]);
          }
          thisNum = thisNum.join('');
          thisNum = parseInt(thisNum);
        }
      } 
      // console.log(a.get(comparator));
      // console.log(b.get(comparator));
      // console.log(a.get(comparator) - b.get(comparator));
      return a.get(comparator) - b.get(comparator);
    });
  
    this.collection = sorted;
    //console.log(this.collection);
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    console.log(field);
    this.collection.sortByField(field);
    console.log('we are in AppView and looking at this.collection');
    console.log(this.collection);
    this.render();
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
  },

  events: {
    'click button' : 'handleClick'
  },

  handleClick: function() {
    this.model.toggleLike();
    this.render();    
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
//    this.listenTo(this.collection, 'change', MoviesView.render);
    //this.collection.on('sort', this.render, this); 
  },

  render: function() {
    this.$el.empty();
    console.log("we are rendering");
    this.collection.forEach(this.renderMovie, this);
  },
  
  // events: {
  //   'change form input': 'render'
  // },
  
  // clickDetector: function() {
  //   console.log('you clicked on a radio button');
  //   this.render();
  // },
  
  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
