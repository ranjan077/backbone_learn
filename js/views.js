// App view
app.Views.appView = Backbone.View.extend({
    initialize: function() {
        
    }
})

//Employee view
app.Views.Employee = Backbone.View.extend({
    tagName: 'tr',
    template: template('employeeTemplate'),
    render: function() {
        this.$el.html(this.template({
                firstName: 'Rocky',
                lastName: 'Balboa',
                email: 'rocky@example.com'
            }));
        return this;
    }
})

//Employees view
app.Views.Employees = Backbone.View.extend({
    tagName: 'tbody',
    render: function() {
        this.collection.each(this.addOne, this)
        return this
    },
    addOne: function(employee) {
        var employeeView = new app.Views.Employee({model:employee});
        this.$el.append(employeeView.render().el);
    }
})

new app.Views.appView();