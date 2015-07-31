/**
 * Created by hkh on 2015-02-17.
 */
define([
    'underscore',
    'backbone',
    'models/cate1'
], function(_, Backbone, Cate1Model){

    var Cate1Collection = Backbone.Collection.extend({
        
        initialize: function(bbs_id) {
            this.bbs_id = bbs_id;
        },

        url: function() {
            return '/cate1/' + this.bbs_id;
        },
        model: Cate1Model
    });

    return Cate1Collection;
});