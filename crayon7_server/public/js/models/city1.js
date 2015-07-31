/**
 * Created by hkh on 2015-02-17.
 */
define([
    'underscore',
    'backbone',
], function(_, Backbone){
    var City1Model = Backbone.Model.extend({
        idAttribute: 'id'
    });

    return City1Model;
});