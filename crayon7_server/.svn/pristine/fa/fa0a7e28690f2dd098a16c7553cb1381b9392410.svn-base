/**
 * Created by hkh on 2015-01-24.
 */

var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var myConnection = require('express-myconnection');

var service = require('./service/service_common');

module.exports = app;

// database setup
var dbOptions = {
    connectionLimit: 1,
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'portal114'
};

app.use(myConnection(mysql, dbOptions, 'pool'));

// Config
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

if (!module.parent) {
    app.use(logger('dev'));
}

app.use(methodOverride('_method'));
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Routes

// 글 목록 조회 서비스
app.get('/posts/list/:bbs_id', service.queryPostList);

// 글 상세 조회 서비스
app.get('/posts/:id', service.queryPostDetail);

// 글 입력
app.post('/posts', service.insertPost);

// 글 수정
app.put('/posts/:id', service.modifyPost);

// 글 삭제
app.delete('/posts/:id', service.deletePost);

// 시/도 조회
app.get('/city', service.queryCity1List);

// 시/구/군 조회
app.get('/city/:id', service.queryCity2List);

// 대분류 조회
app.get('/cate1/:bbs_id', service.queryCate1List);

// 소분류 조회
app.get('/cate2/:bbs_id', service.queryCate2List);

if (!module.parent) {
    app.listen(8001);
    console.log('Express started on port 8001');
}

