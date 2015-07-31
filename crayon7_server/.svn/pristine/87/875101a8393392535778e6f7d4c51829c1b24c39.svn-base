/**
 * Created by hkh on 2015-02-22.
 */
var mysql = require('mysql');
var async = require('async');
var _ = require('underscore');
var sqlCommon = require('../sql/sql_common');
var sqlBatch = require('../sql/sql_batch');

var pool  = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'portal114'
});

module.exports = {
    insertPost: function(post){
        // get city1 id
        var data = {
            title: post.title,
            content: post.content,
            bbs_id: post.bbs_id,
            city1: post.city1,
            city2: post.city2,
            cate1: post.cate1
        };

        // async.parallel() - https://github.com/caolan/async#parallel
        async.parallel({
            city1_id: function(callback){
                pool.query(sqlCommon.QUERY_CITY_1, [post.city1], function(err, results) {
                    if (err) callback(err, null);
                    try {
                        callback(null, results[0].id);
                    } catch (e) {
                        console.log(e);
                        callback(e, null);
                    }
                });
            },
            city2_id: function(callback){
                pool.query(sqlCommon.QUERY_CITY_2, [post.city2], function(err, results) {
                    if (err) {
                        console.log('err: '+err);
                        callback(err, null);
                    }
                    try {
                        callback(null, results[0].id);
                    } catch (e) {
                        console.log(e);
                        callback(e, null);
                    }
                });
            },
            cate1_id: function(callback){
                pool.query(sqlCommon.QUERY_CATE_1, [post.cate1], function(err, results) {
                    if (err) {
                        console.log('err: '+err);
                        callback(err, null);
                    }
                    if (!results[0]){
                        console.log(this.sql);
                    }
                    try {
                        callback(null, results[0].id);
                    } catch (e) {
                        console.log(e);
                        callback(e, null);
                    }
                });
            }
        }, function(err, results){

            _.extend(data, results);
            pool.query(sqlCommon.INSERT_POST, data, function(err, results) {
                if (err){
                    console.log('insertPost: '+err);
                } else {
                    console.log('insert post success');
                }
            });
        });
    },
    queryScrapped: function(date, successCb){
        pool.query(sqlBatch.QUERY_SCRAPPED, [date], function(err, results) {
            if (!err) {
                successCb(results);
            }
        });
    },
    insertScrappedPost: function(detailItem){
        var data = {
            post_id: detailItem.postId,
            date: detailItem.date
        }
        pool.query(sqlBatch.INSERT_SCRAPPED, data, function(err, results) {
            if (err) {
                console.log('insertScrappedPost: '+err);
            }
        });
    }
};