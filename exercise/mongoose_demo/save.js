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

var Post = mongoose.model('Post', postSchema);

var newpost = new Post({
    city1: '서울',
    city2: '마포구',
    cate1: '아파트',
    cate2: '매매',
    bbs: 'house',
    title: '은행보다 훨씬높은 수익률로 안전하게 투자하세요~!',
    content: '현재 마포구청옆에 연예인이 운영하는 제주 흑돈대가 라는 체인 음식점이 200평 들어옵니다.'
});

// save model
newpost.save(function(err, newpost) {
   if (err) {
       console.error(err);
   } else {
       console.log('post saved');
   }
});