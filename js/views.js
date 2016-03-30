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
            $('#addForm').html(new app.Views.EmployeeAddView({collection: employeesCollection}).render().el);
        });
        $('#search').keyup(_.debounce(function(e) {
           var result = employeesCollection.filter(function(model) { 
               var pattern = new RegExp( $(e.target).val(),"gi");
               return pattern.test(model.get("firstName"));
           });
            console.log(result);
            $('#employeeTable').html('');;
            $('#employeeTable').append(employeesView.render(result).el);
        }, 300));
    }
})

//Employee view
app.Views.Employee = Backbone.View.extend({
    tagName: 'tr',
    template: template('employeeTemplate'),
    initialize: function() {
      this.model.on('change', this.update, this);  
      this.model.on('destroy', this.unRender, this);  
    },
    events: {
        'click #editEmployeeBtn': 'editEmployee',
        'click #deleteEmployeeBtn': 'deleteEmployee'
    },
    editEmployee: function() {
      var empEditView = new app.Views.EmployeeEditView({model: this.model});
        $('#editForm').html(empEditView.render().el);
    },
    deleteEmployee: function() {
        this.model.destroy();
    },
    update: function(employee) {
        this.render();
    },
    unRender: function() {
        this.remove();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})

//Employees view
app.Views.Employees = Backbone.View.extend({
    tagName: 'tbody',
    initialize: function() {
        this.collection.on('add', this.addOne, this);
     },
    render: function(filteredCollection) {
        this.$el.html('')
        if(!filteredCollection){
            this.collection.each(this.addOne, this)
        }
        else {
            filteredCollection.forEach(this.addOne, this)
        }
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
    events: {
        'click .Update': 'updateEmployee'
    },
    updateEmployee: function(e) {
        e.preventDefault();
       
        this.model.set('firstName', $('#edit_fname').val());
        this.model.set('lastName', $('#edit_lname').val());
        this.model.set('email', $('#edit_email').val());
        $('#editFormModal').modal('toggle');
    },
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
        $('#addFormModal').modal('toggle');
        var newEmployee = new app.Models.Employee({
            firstName: $('#add_fname').val(),
            lastName: $('#add_lname').val(),
            email: $('#add_email').val()
        });
        this.collection.add(newEmployee);
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    }
})
new app.Views.appView();