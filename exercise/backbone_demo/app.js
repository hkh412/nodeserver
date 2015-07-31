/**
 * Created by hkh on 2015-02-13.
 */

// 모듈 추출
var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

// 모듈 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// demo 데이터 생성
var books = [{
    id: 0,
    name: '모던 웹을 위한 JavaScript + jQuery 입문',
    isbn: '9788979148749',
    today_count: 10
}, {
    id: 1,
    name: '모던 웹을 위한 Node.js 입문',
    isbn: '9788979148749',
    today_count: 10
}, {
    id: 2,
    name: '모던 웹을 위한 HTML5 + CSS3 입문',
    isbn: '9788979148749',
    today_count: 10
}];

// Routing 설정
router.get('/books', function (request, response) {
    response.send(books);
});

router.get('/books/:id', function (request, response) {
    response.send(books[request.params["id"]]);
});

router.all('*', function (request, response) {
    // url과 body 속성을 출력합니다.
    console.log();
    console.log(request.method + ' : ' + request.url);
    console.log('body: ' + JSON.stringify(request.body, null, 2));

    response.sendStatus(200);
});

app.use(router);

http.createServer(app).listen(8800, function(){
    console.log('Server running at http://localhost:8800');
});