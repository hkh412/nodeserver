/**
 * Created by hkh on 2015-02-17.
 */
define([
    'underscore',
    'backbone',
], function(_, Backbone){
    var City2Model = Backbone.Model.extend({
        idAttribute: 'id'
    });

    return City2Model;
});