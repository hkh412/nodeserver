/**
 * Created by hkh on 2015-02-14.
 */

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
var router = express.Router();

var db = require('mongojs').connect('rest', ['todos', 'users']);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser('secret key'));
app.use(express.static(__dirname + '/public'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat'
}));

app.use(router);

// query list - todos
router.get('/todos', function (req, res) {
    if (!req.session.me) {
        // 권한 없음
        res.sendStatus(401);
        return;
    }
    db.todos.find({
        author: req.session.me._id.toString()
    }, function(err, results) {
       if (err) {
           res.sendStatus(500);
       } else {
           res.send(results);
       }
    });
});

// query by id - todos
router.get('/todos/:id', function (req, res) {
    if (!req.session.me) {
        // 권한 없음
        res.sendStatus(401);
        return;
    }
    db.todos.findOne({
        _id: db.ObjectId(req.params.id),
        author: req.session.me._id.toString()
    }, function (err, result) {
        if (err) {
            res.sendStatus(500);
        } else if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    });
});

// insert - todos
router.post('/todos', function (req, res) {
    if (!req.session.me) {
        res.sendStatus(401);
        return;
    }
    if (req.body.title) {
        db.todos.insert({
            title: req.body.title,
            completed: false,
            author: req.session.me._id.toString()
        }, function(err, results) {
            if (err) {
                res.sendStatus(500);
            } else {
                // Status Code 200 (성공)
                res.send(results);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

// modify - todos
router.put('/todos/:id', function (req, res) {
    if (!req.session.me) {
        // 권한 없음
        res.sendStatus(401);
        return;
    }
    if (req.body.completed) {
        db.todos.update({
            _id: db.ObjectId(req.params.id),
            author: req.session.me._id.toString()
        }, {
            $set: {
                completed: (function() {
                    if (req.body.completed == 'true') {
                        return true;
                    } else if (req.body.completed == true) {
                        return true;
                    } else {
                        return false;
                    }
                })()
            }
        }, function (err, result) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

// remove - todos
router.delete('/todos/:id', function (req, res) {
    db.todos.remove({
        _id: db.ObjectId(req.params.id)
    }, function (err, result) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

// query list - users
router.get('/users', function (req, res) {
    db.users.find(function (err, results) {
        res.send(results);
    });
});

// sign up
router.post('/users', function (req, res) {
    var login = req.body.login;
    var password = req.body.password;

    if (login && password) {
        db.users.findOne({
            login: login
        }, function (err, result) {
            if (result) {
                res.sendStatus(409);
            } else {
                // 사용자 정보 해시화
                var shasum = require('crypto').createHash('sha1');
                shasum.update(password);
                var hash = shasum.digest('hex');

                db.users.insert({
                    login: login,
                    hash: hash
                }, function (err, result) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    } else {
        // bad request
        res.sendStatus(400);
    }
});

router.get('/users/me', function (req, res) {
    // 로그인 상태 확인
    if (req.session.me) {
        res.send(req.session.me);
    } else {
        // Unauthorized
        res.sendStatus(401);
    }
});

router.get('/users/logout', function (req, res) {
    // 로그인 상태 확인
    if (req.session.me) {
        req.session.destroy();
        res.sendStatus(200);
    } else {
        // Unauthorized
        res.sendStatus(401);
    }
});

// sign in
router.post('/users/login', function (req, res) {
    var login = req.body.login;
    var password = req.body.password;

    if (login && password) {
        db.users.findOne({
            login: login
        }, function (err, result) {
            if (err) {
                res.sendStatus(500);
            } else if (result) {
                var shasum = require('crypto').createHash('sha1');
                shasum.update(password);
                var hash = shasum.digest('hex');

                if (hash == result.hash) {
                    req.session.me = result;
                    res.sendStatus(200);
                } else {
                    res.status(400).send({ message: '비밀번호가 맞지 않음'});
                }
            } else {
                res.status(400).send({ message: '아이디 없음'});
            }
        })
    } else {
        res.status(400).send({ message: '요청 매개변수가 적절하지 않음'});
    }

});

http.createServer(app).listen(8800, function() {
    console.log('Express server listening on port 8800');
});

