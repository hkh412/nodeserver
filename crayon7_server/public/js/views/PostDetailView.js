/**
 * Created by hkh on 2015-02-28.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/post',
    'text!templates/postDetailTpl.html'
], function($, _, Backbone, App, PostModel, PostDetailTemplate) {

    var PostDetailView = Backbone.View.extend({
        tagName: 'section',
        template: _.template(PostDetailTemplate),
        initialize: function(id){
            this.model = new PostModel({'id': id});
            this.listenTo(this.model, 'change', this.modelChange);
            this.model.fetch();
        },
        render: function(){
            $('#content').empty().append(this.el);
            //console.log(this.model.toJSON());
            this.$el.empty().html(this.template(this.model.toJSON()));
        },
        modelChange: function(){
            this.model.set('content', this.nl2br(this.model.get('content')));
            this.render();
        },
        update: function(id){
            this.model.set('id', id);
            this.model.fetch();
        },
        // newline to <br /> tag
        nl2br: function(str) {
            return str.replace(/\r\n/g, "<br />");
        },
        close: function(){
            this.$el.empty();
            this.stopListening();
        }
    });

    return PostDetailView
});