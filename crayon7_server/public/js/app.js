/**
 * Created by hkh on 2015-02-21.
 */
define([
    'underscore',
    'backbone',
], function(_, Backbone){

    var App = {
        values: {
        },
        views: {
            itemViews: []
        },
        events: {},
        default: {}
    };
    App.events = _.clone(Backbone.Events);

    App.default.strings = {
        all_region: '전국'
    };

    App.default.bbs = {
        bbs_id: 'job',
        bbs_name: '구인정보'
    };
    App.default.city1 = {
        id: 0,
        name: '시/도'
    };
    App.default.city2 = {
        id: 0,
        name: '시/구/군'
    };
    App.default.cate1 = {
        id: 0,
        name: '분류선택'
    };


    return App;
});