/**
 * Created by hkh on 2015-01-25.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:8000/portaldb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('mongo db opened');
});

/**
 * Should I repeat schema definition every time?
 */
var postSchema = mongoose.Schema({
    city1: String,
    city2: String,
    cate1: String,
    cate2: String,
    bbs: String,
    title: String,
    content: String
}, { collection: 'posts'});

var Post = mongoose.model('Post', postSchema, 'posts');

/**
 * params:
 * condition: {}
 * field selection: exclude '_id', '__v'
 * callback
 */
Post.find({}, {_id:0, __v:0}, function(err, docs){
    if (err) {
        console.log(err);
    }
    console.log(docs);
    process.exit();
}).exec();

