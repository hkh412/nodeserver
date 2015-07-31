/**
 * Created by hkh on 2015-02-21.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/post'
], function($, _, Backbone, PostModel){

    var PostCollection = Backbone.Collection.extend({
        initialize: function(bbs_id){
            this.bbs_id = bbs_id;
        },
        url: function(){
            return '/posts/list/'+this.bbs_id+'?'+ $.param(this.params);
        },
        model: PostModel,
        params: {
            city1: '',
            city2: '',
            cate1: '',
            page: 1
        },
        // paginator page 개수 (서버에서 받음)
        totalPages: 0,
        currentPage: 1,
        // 서버 json 메시지 파싱
        parse: function(response){
            // response from server
            // {pages: 3, currentPage: 1, data: [{post1},{post2}...]}
            this.params.page = 1;       // reset to default
            this.totalPages = response.totalPages;
            this.currentPage = response.currentPage;
            return response.data;
        }
    });

    return PostCollection;
});