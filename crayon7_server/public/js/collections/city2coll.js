/**
 * Created by hkh on 2015-02-17.
 */
define([
    'underscore',
    'backbone',
    'models/city2'
], function(_, Backbone, City2Model){

    var City2Collection = Backbone.Collection.extend({

        initialize: function(city1_id) {
            this.city1_id = city1_id;
        },
        url: function() {
            return '/city/' + this.city1_id;
        },
        model: City2Model
    });

    return City2Collection;
});