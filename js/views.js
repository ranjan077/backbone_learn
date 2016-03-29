// App view
app.Views.appView = Backbone.View.extend({
    initialize: function() {
        var employeesCollection = new app.Collections.Employees([{
            firstName: 'Rocky',
            lastName: 'Balboa',
            email: 'rocky@example.com'
        },{
            firstName: 'John',
            lastName: 'Rambo',
            email: 'john@example.com'
        },{
            firstName: 'David',
            lastName: 'Ran',
            email: 'david@example.com'
        }]);
        var employeesView = new app.Views.Employees({collection: employeesCollection});
        $('#employeeTable').append(employeesView.render().el);
        
        $("#addEmployeeBtn").on('click', function(e) {
            $('#addForm').html(new app.Views.EmployeeAddView().render().el);
        })
    }
})

//Employee view
app.Views.Employee = Backbone.View.extend({
    tagName: 'tr',
    template: template('employeeTemplate'),
    events: {
        'click #editEmployeeBtn': 'editEmployee'
    },
    editEmployee: function() {
      var empEditView = new app.Views.EmployeeEditView({model: this.model});
        $('#editForm').html(empEditView.render().el);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
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

//Employee edit form view
app.Views.EmployeeEditView =  Backbone.View.extend({
    tagName: 'form',
    template: template('editEmployeeTemplate'),
    render: function() {
        this.$el.html(this.template( this.model.toJSON() ));
        return this
    }
})

// Employee add form view
app.Views.EmployeeAddView =  Backbone.View.extend({
    tagName: 'form',
    template: template('addEmployeeTemplate'),
    events: {
        'click .clear': 'clearForm',
        'click .add': 'addEmployee'
    },
    initialize: function() {
       
    },
    clearForm: function(e) {
         $('#add_fname').val('');
         $('#add_lname').val('');
         $('#add_email').val('');
    },
    addEmployee: function(e) {
        e.preventDefault();
        $('#add_fname').val();
         $('#add_lname').val('');
         $('#add_email').val('');
        new app.Models.Employee({
            firstName: $('#add_fname').val(),
            lastName: $('#add_lname').val(),
            email: $('#add_email').val()
        })
    },
    render: function() {
        this.$el.html(this.template());
        return this
    }
})
new app.Views.appView();