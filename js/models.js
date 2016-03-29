// Employee Model
app.Models.Employee = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
        email: ''
    },
    validate: function(attrs) {
        if(!attrs.firstName.trim()) {
            return 'Employee first name is required';
        }
        if(!attrs.lastName.trim()) {
            return 'Employee last name is required';
        }
        if(!attrs.email.trim()) {
            return 'Employee email is required';
        }
    }
})