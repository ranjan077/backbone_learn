app.Collections.Employees = Backbone.Collection.extend({
    model: app.Models.Employee,
    initialize: function() {
        
    },
    sortBy: 'firstName',
    sort_dir : 'aesc',
    comparator: function(a, b) {
      // Optional call if you want case insensitive
      name1 = a.get(this.sortBy).toLowerCase();
      name2 = b.get(this.sortBy).toLowerCase();

      if (name1 < name2)
        ret = -1;
      else if (name1 > name2)
        ret = 1;
      else
        ret = 0;

      if (this.sort_dir === "desc")
        ret = -ret
      return ret;
    }
})