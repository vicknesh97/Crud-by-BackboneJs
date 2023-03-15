// var firstView = Backbone.View.extend({
//     initialize: function(){
//        this.render();
//     },
//     render: function(){
//       alert("Hello World");
//     }
// });

// var firstViewObj = new firstView();

/*var detail1 = new Detail({
    name: "kamalesh",
    email: "kamal@gmail.com",
    city: "coimbatore"
});

var detail2 = new Detail({
    name: "karan",
    email: "karan@gmail.com",
    city: "rsmangalam"
});*/


//model

var Detail = Backbone.Model.extend({
    defaults: {
        name: '',
        email: '',
        city: '',
    }
});

//Collection
var Details = Backbone.Collection.extend({

});


var details = new Details();

var DetailView = Backbone.View.extend({
    model: new Detail(),
    tagName: 'tr',
    initialize: function(){
        this.template = _.template($('.details-list-template').html());
    },
    events: {
        'click .edit-detail': 'edit',
        'click .update-detail': 'update',
        'click .cancel': 'cancel',
        'click .delete-detail': 'delete'
    },
    edit: function(){
        $('.edit-detail').hide();
        $('.delete-detail').hide();
        $('.update-detail').show();
        $('.cancel').show();

        var name = this.$('.name').html();
        var email = this.$('.email').html();
        var city = this.$('.city').html();

        this.$('.name').html('<input type="text" class="form-control name-update" value="'+ name +'">');
        this.$('.email').html('<input type="text" class="form-control email-update" value="'+ email +'">');
        this.$('.city').html('<input type="text" class="form-control city-update" value="'+ city +'">');
        
    },
    update: function() {
        this.model.set('name', $('.name-update').val());
        this.model.set('email', $('.email-update').val());
        this.model.set('city', $('.city-update').val());
    },
    cancel: function() {
        detailsView.render();
    },
    delete: function() {
		this.model.destroy();
	},
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var DetailsView = Backbone.View.extend({
   model: details,
   el: $('.details-list'),
    initialize: function(){
        var self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function() {
            setTimeout(function() {
                self.render();
            }, 30);
        },this);
        this.model.on('remove', this.render, this);
    },
    render: function(){
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(detail){
            self.$el.append((new DetailView({model: detail})).render().$el);
        });
        return this;
    }
});

var detailsView = new DetailsView();

$(document).ready(function(){
    $('.add-detail').on('click', function(){
        var detail = new Detail({
            name: $('.name-input').val(),
            email: $('.email-input').val(),
            city: $('.city-input').val()
        });
        $('.name-input').val('');
        $('.email-input').val('');
        $('.city-input').val('');
        console.log(detail.toJSON());
        details.add(detail);
    })
})