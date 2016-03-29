(function() {
    window.app = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    }
    window.template =function(id) {
        return _.template($('#'+id).html());
    }
})();