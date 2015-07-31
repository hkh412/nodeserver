/**
 * Created by hkh on 2015-02-21.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!templates/postItemTpl.html'
], function($, _, Backbone, App, PostItemTemplate){

    var PostItemView = Backbone.View.extend({
        tagName: 'tr',
        template: _.template(PostItemTemplate),
        initialize: function(){
            this.render();
        },
        //events: {
        //    'click .a-href-detail': 'detailLink'
        //},
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },
        //detailLink: function(){
        //    console.log(this.model.toJSON());
        //},
        close: function(){
            console.log('post item close');
            this.remove();
        }
    });

    return PostItemView;
});