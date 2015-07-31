/**
 * Created by hkh on 2015-03-30.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/post',
    'text!templates/postEditTpl.html',
    'views/NavBarView'
], function($, _, Backbone, App, PostModel, PostEditTemplate, NavBarView) {

    var PostEditView = Backbone.View.extend({
        tagName: 'section',
        template: _.template(PostEditTemplate),
        initialize: function(id) {
            if (id == 0) {
                // 새 글 등록
                this.model = new PostModel();
                this.render();
            } else {
                // 수정일 때
                this.model = new PostModel({'id': id});
                this.listenTo(this.model, 'change', this.modelChange);
                this.model.fetch();
            }
        },
        events: {
            'click #bbs-menu-select li': 'bbsMenuSelect',
            'click #btn-submit': 'onSubmit'
        },
        render: function(){
            $('#content').empty().append(this.el);
            this.$el.empty().html(this.template());
            App.views.navBarView = new NavBarView(this.bbs_id);
        },
        modelChange: function(){
            //this.model.set('content', this.nl2br(this.model.get('content')));
            this.render();
        },
        update: function(id) {
            //if (id) {
            //    // 수정일 때
            //    this.model.set('id', id);
            //    this.model.fetch();
            //} else {
            //    // 새 글 등록
            //    this.render();
            //}
        },
        // 게시판 선택 이벤트
        bbsMenuSelect: function(event) {
            var $li = $(event.currentTarget);
            this.bbs_id = $li.find('a').attr('data-value');
            var bbs_name = $li.text();
            $('#bbs-menu-title').text(bbs_name);

            App.views.navBarView.update(this.bbs_id);
        },
        // 등록하기 버튼 클릭
        onSubmit: function() {
            if (!this.checkValidation()) {
                return;
            }

            var city1 = $('#city1-title').text();
            var city2 = $('#city2-title').text();
            var cate1 = $('#cate1-title').text();
            var title = $('#input-title').val();
            // textarea val() 함수는 \r\n을 먹는다.. (해결책으로 <br /> replace);
            var content = $('#ta-content').val().replace(/\n/g, '<br />');


            this.model.set('city1', city1);
            this.model.set('city2', city2);
            this.model.set('cate1', cate1);
            this.model.set('title', title);
            this.model.set('content', content);
            this.model.set('bo_table', this.bbs_id);

            console.log(this.model.toJSON());
            var that = this;
            this.model.save(null, {
                success: function(model, response) {
                    alert('정상적으로 등록되었습니다.');
                    location.href = '#'+that.bbs_id;
                },
                error: function(model, response) {
                    alert('글 등록시 오류가 발생했습니다. 다시 시도해 주세요.');
                }
            });
        },
        checkValidation: function() {
            // 이용약관 동의 체크
            if (!$('#input-policy').is(':checked')) {
                alert('이용약관에 동의해 주세요.');
                return false;
            }

            // 게시판 메뉴 선택 체크
            if (!this.bbs_id) {
                alert('게시판을 선택해 주세요.');
                return false;
            }

            // 시/도 선택여부
            if (!App.views.navBarView.getCity1Index()) {
                alert('시/도를 선택해 주세요.');
                return false;
            }

            // 시/구/군 선택여부
            if (!App.views.navBarView.getCity2Index()) {
                alert('시/구/군을 선택해 주세요.');
                return false;
            }

            // 분류 선택여부
            if (!App.views.navBarView.getCate1Index()) {
                alert('분류를 선택해 주세요.');
                return false;
            }

            // 제목 체크
            var title = $('#input-title').val();
            if (title.length <= 0) {
                alert('제목을 입력해 주세요.');
                return false;
            }

            // 내용 체크
            var content = $('#ta-content').val();
            if (content.length <= 0) {
                alert('내용을 입력해 주세요.');
                return false;
            }

            return true;
        },
        close: function(){
            this.$el.empty();
            this.stopListening();
        }
    });
    return PostEditView;
});