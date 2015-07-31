/**
 * Created by hkh on 2015-02-17.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'views/ListFrameView',
    'views/PostDetailView',
    'views/PostEditView',
], function($, _, Backbone, App, ListFrameView, PostDetailView, PostEditView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '':             'showHome',
            'job':          'showList',
            'resume':       'showList',
            'house':        'showList',
            'market':       'showList',
            'car':          'showList',
            'adver':        'showList',
            'posts/:id':    'showDetail',
            'editpost/:id': 'editPost'
        },
        showHome: function(){
            location.hash = App.default.bbs.bbs_id;
            App.values.currentBbsName = App.default.bbs.bbs_name;
        },
        /**
         * 글 목록 생성 router
         */
        showList: function(){
            var bbs_id = location.hash.replace('#', '');

            // active class 변경, 제목 변경
            $('#bbs-menu>li').removeClass('active');
            var $li = $('#bbs-menu>li').filter(function(){
                return $(this).find('a').attr('href') == location.hash;
            }).addClass('active');

            App.values.currentBbsName = $li.text();
            App.events.trigger('bbsSelect', App.values.currentBbsName);

            // list view 생성
            if (!App.views.listFrameView) {
                App.views.listFrameView = new ListFrameView(bbs_id);
            } else {
                App.views.listFrameView.update(bbs_id);
            }
        },
        showDetail: function(id){
            console.log('show detail...on router: '+id);

            if (!App.views.postDetailView) {
                App.views.postDetailView = new PostDetailView(id);
            } else {
                App.views.postDetailView.update(id);
            }
        },
        editPost: function(id){
            // id: 0 for create new post
            // id: any other postId for edit, modify corresponding post
            console.log('edit post... on router: '+id);
            App.views.postEditView = new PostEditView(id);
            //if (!App.views.postEditView) {
            //    id = id == 0 ? undefined : id;
            //    App.views.postEditView = new PostEditView(id);
            //} else {
            //    App.views.postEditView.update(id);
            //}
        }
    });

    var initialize = function() {
        var app_router = new AppRouter();
        Backbone.history.start();
        location.hash = App.default.bbs.bbs_id;     // job
    };
    return {
        initialize: initialize
    };
});