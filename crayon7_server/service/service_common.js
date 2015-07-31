
/**
 * Created by hkh on 2015-02-11.
 */
var async = require('async');
var sqlCommon = require('../sql/sql_common');
var _ = require('underscore');
var moment = require('moment');

var NUM_PER_PAGE = 30;
/**
 * 글 목록 조회 서비스
 * @param req
 * @param res
 */
exports.queryPostList = function(req, res, next) {

    req.getConnection(function(err, connection){
        if (err) return next(err);

        var bbs_id = req.params["bbs_id"];
        var criterion = '';

        if (req.query.city1 && req.query.city1.length>0){
            criterion+=' AND city1="'+req.query.city1+'"';
        }
        if (req.query.city2 && req.query.city2.length>0){
            criterion+=' AND city2="'+req.query.city2+'"';
        }
        if (req.query.cate1 && req.query.cate1.length>0){
            criterion+=' AND cate1="'+req.query.cate1+'"';
        }
        criterion += ' ORDER BY ctdt DESC';
        var page = 1;
        if (req.query.page && req.query.page.length>0){
            try {
                page = parseInt(req.query.page);
                if (page <=0) {
                    page = 1;
                }
            } catch (e) { console.log(e) }
        }

        // query total pages
        connection.query(sqlCommon.QUERY_POST_CNT+criterion, [bbs_id], function(err, results){
            if (err) return next(err);

            var resObj = {
                totalPages: Math.round(results[0].cnt / NUM_PER_PAGE) || 1,
                currentPage: page
            };

            var offset = NUM_PER_PAGE * (page-1);
            var limit = ' LIMIT '+offset+', '+NUM_PER_PAGE;

            connection.query(sqlCommon.QUERY_POST_LIST+criterion+limit, [bbs_id], function(err, results){
                console.log(this.sql);
                if (err) return next(err);

                // date format
                var now = moment();
                _.each(results, function(item){
                    if (item.date) {
                        var time = moment(item.date);
                        if (now.diff(time, 'days') > 0){
                            // at least 1 days ago
                            item.date = time.format('YYYY-MM-DD');
                            //console.log(time.format('YYYY-MM-DD'));
                        } else {
                            item.date = time.format('HH:mm:ss');
                            //console.log(time.format('HH:mm:ss a'));
                        }
                    }
                });
                resObj.data = results;

                //console.log(results);
                res.send(resObj);
            });
        });
    });
};

/**
 * 글 상세 조회 서비스
 * @param req
 * @param res
 */
exports.queryPostDetail = function(req, res, next) {

    req.getConnection(function(err, connection){
        if (err) return next(err);

        var id = req.params["id"];
        connection.query(sqlCommon.QUERY_POST_DETAIL, [id], function(err, results){
            if (err) return next(err);

            var item = {};
            if (results.length > 0) {
                item = results[0];
                var time = moment(item.date);
                item.date = time.format('YYYY-MM-DD HH:mm:ss');
            }
            res.send(item);
        });
    });
};

/**
 * 글 입력 서비스
 * @param req
 * @param res
 */
exports.insertPost = function(req, res, next) {

    req.getConnection(function(err, connection){
        if (err) return next(err);

        // get city1 id
        var data = {
            title: req.body.title,
            content: req.body.content,
            bbs_id: req.body.bo_table,
            city1: req.body.city1,
            city2: req.body.city2,
            cate1: req.body.cate1
        };

        // async.parallel() - https://github.com/caolan/async#parallel
        async.parallel({
            city1_id: function(callback){
                connection.query(sqlCommon.QUERY_CITY_1, [req.body.city1], function(err, results) {
                    if (err) callback(err, null);
                    callback(null, results[0].id);
                });
            },
            city2_id: function(callback){
                connection.query(sqlCommon.QUERY_CITY_2, [req.body.city2], function(err, results) {
                    if (err) callback(err, null);
                    callback(null, results[0].id);
                });
            },
            cate1_id: function(callback){
                connection.query(sqlCommon.QUERY_CATE_1, [req.body.cate1], function(err, results) {
                    if (err) callback(err, null);
                    callback(null, results[0].id);
                });
            }
        }, function(err, results){
            if (err) return next(err);

            _.extend(data, results);
            connection.query(sqlCommon.INSERT_POST, data, function(err, results) {
                res.send(data);
            });
        });
    });
};

/**
 * 글 수정 서비스
 * @param req
 * @param res
 */
exports.modifyPost = function(req, res, next) {

    req.getConnection(function(err, connection){
        if (err) return next(err);

        // get city1 id
        var id = req.params.id;
        var data = {
            title: req.body.title,
            content: req.body.content,
            bbs_id: req.body.bo_table
        };

        // async.parallel() - https://github.com/caolan/async#parallel
        async.parallel({
            city1_id: function(callback){
                connection.query(sqlCommon.QUERY_CITY_1, [req.body.city1], function(err, results) {
                    if (err) callback(err, null);
                    callback(null, results[0].id);
                });
            },
            city2_id: function(callback){
                connection.query(sqlCommon.QUERY_CITY_2, [req.body.city2], function(err, results) {
                    if (err) callback(err, null);
                    callback(null, results[0].id);
                });
            },
            cate1_id: function(callback){
                connection.query(sqlCommon.QUERY_CATE_1, [req.body.cate1], function(err, results) {
                    if (err) callback(err, null);
                    callback(null, results[0].id);
                });
            },
            cate2_id: function(callback){
                connection.query(sqlCommon.QUERY_CATE_2, [req.body.cate2], function(err, results) {
                    if (err) callback(err, null);
                    if (results.length > 0) {
                        callback(null, results[0].id);
                    } else {
                        callback(null, undefined);
                    }
                });
            }
        }, function(err, results){
            if (err) return next(err);

            _.extend(data, results);
            connection.query(sqlCommon.UPDATE_POST, [data, id], function(err, results) {
                res.sendStatus(200);
            });
        });
    });
};

/**
 * 글 삭제 서비스
 * @param req
 * @param res
 */
exports.deletePost = function(req, res, next) {
    req.getConnection(function(err, connection){
        if (err) return next(err);

        var id = req.params["id"];
        connection.query(sqlCommon.DELETE_POST, [id], function(err, results){
            if (err) return next(err);

            res.sendStatus(200);
        });
    });
};

/**
 * 시/도 조회 (city1)
 * @param req
 * @param res
 * @param next
 */
exports.queryCity1List = function(req, res, next) {
    req.getConnection(function(err, connection){
        if (err) return next(err);

        connection.query(sqlCommon.QUERY_CITY_1_LIST, [], function(err, results){
            if (err) return next(err);

            //console.log(results);
            res.send(results);
        });
    });
};

/**
 * 시/구/군 조회 (city2)
 * @param req
 * @param res
 * @param next
 */
exports.queryCity2List = function(req, res, next) {
    req.getConnection(function(err, connection){
        if (err) return next(err);

        var city1_id = req.params["id"];
        connection.query(sqlCommon.QUERY_CITY_2_LIST, [city1_id], function(err, results){
            if (err) return next(err);

            //console.log(results);
            res.send(results);
        });
    });
};

/**
 * 대분류 조회
 * @param req
 * @param res
 * @param next
 */
exports.queryCate1List = function(req, res, next) {
    req.getConnection(function(err, connection){
        if (err) return next(err);

        var bbs_id = req.params["bbs_id"];
        connection.query(sqlCommon.QUERY_CATE_1_LIST, [bbs_id], function(err, results){
            if (err) return next(err);

            //console.log(results);
            res.send(results);
        });
    });
};

/**
 * 소분류 조회
 * @param req
 * @param res
 * @param next
 */
exports.queryCate2List = function(req, res, next) {
    req.getConnection(function(err, connection){
        if (err) return next(err);

        var bbs_id = req.params["bbs_id"];
        connection.query(sqlCommon.QUERY_CATE_2_LIST, [bbs_id], function(err, results){
            if (err) return next(err);

            //console.log(results);
            res.send(results);
        });
    });
};