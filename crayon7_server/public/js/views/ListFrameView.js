/**
 * Created by hkh on 2015-02-21.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!templates/listFrameTpl.html',
    'views/NavBarView',
    'views/PostListView'
], function($, _, Backbone, App, ListFrameTemplate, NavBarView, PostListView){

    var ListFrameView = Backbone.View.extend({
        tagName: 'section',
        template: _.template(ListFrameTemplate),
        initialize: function(bbs_id){
            this.bbs_id = bbs_id;
            this.$el.html(this.template());

            App.events.on('city1Select', this.city1Select);
            App.events.on('city1Reset', this.city1Reset);
            App.events.on('bbsSelect', this.bbsSelect);

            this.render();
        },
        render: function(){
            $('#content').empty().append(this.el);

            this.bbsSelect(App.values.currentBbsName);

            // reset NavBarView
            App.views.navBarView = new NavBarView(this.bbs_id);
            //if (!App.views.navBarView) {
            //} else {
            //    App.views.navBarView.update(this.bbs_id);
            //}

            // reset PostListView
            if (!App.views.postListView) {
                App.views.postListView = new PostListView(this.bbs_id);
            } else {
                App.views.postListView.update(this.bbs_id);
            }

        },
        update: function(bbs_id){
            this.bbs_id = bbs_id;
            this.render();
        },
        city1Select: function(city1){
            if (city1.id == 0) {
                $('#sub-header-city').text(App.default.strings.all_region);
            } else {
                $('#sub-header-city').text(city1.name);
            }
        },
        city1Reset: function(){
            $('#sub-header-city').text(App.default.strings.all_region);
        },
        bbsSelect: function(bbs_name){
            $('#sub-header-bbs').text(bbs_name);
        },
        close: function(){
            this.stopListening();
            this.$el.empty();

            // close children
            if (App.views.navBarView) {
                App.views.navBarView.close();
            }
            if (App.views.postListView) {
                App.views.postListView.close();
            }
        }
    });

    return ListFrameView;
});