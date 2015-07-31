/**
 * Created by hkh on 2015-02-02.
 */
var listTask = require('./list-task');
var detailTask = require('./detail-task');
var dbTask = require('./db-task');
var _ = require('underscore');

var N_PAGES = 3;
var DELAY_MILLIS = 1000;

var testItem = {
    cate1: '서비스직',
    title: '직원 급구',
    link: 'board.php?bo_mode=view&bo_table=job&id=25046&page=1',
    postId: '25046',
    city1: '서울',
    city2: '구로구',
    bbs_id: 'job' };

var main = function() {
    scrapListTask();
};

var scrapListTask = function(){
    listTask.scrap(N_PAGES);
    listTask.on('parse', function(list) {
        console.log('list parsed...');

        var dates = [];
        _.each(list, function(item){
            if (_.indexOf(dates, item.date)<0){
                dates.push(item.date);
            }
        });

        var cbcnt = dates.length;
        for (var i=0; i<dates.length; i++){
            var date = dates[i];
            dbTask.queryScrapped(date, function(scrappedPosts){
                console.log('before filter length: ', list.length);
                _.each(scrappedPosts, function(post, index){
                    // filter posts with same postId
                    list = _.reject(list, function(item){
                        return (item.postId == post.post_id);
                    });

                    if (index == scrappedPosts.length-1) {
                        console.log('after filter length: ', list.length);
                        console.log(list);
                    }
                });

                // if all task done do next
                cbcnt--;
                if (cbcnt == 0){
                    scheduleDetailTask(list);
                }
            });
        }

        // the first time
        if (dates.length == 0) {
            scheduleDetailTask(list);
        }
    });
    listTask.on('error', function(err) {
        console.log(err);
    });
};

var scheduleDetailTask = function(list) {
    console.log('query detail...');
    _.each(list, function(item, index){
        setTimeout(function(){
            scrapDetailTask(item);
        }, DELAY_MILLIS * (index+1));
    });
}

var scrapDetailTask = function(listItem) {
    console.log('scrap detail task...');
    detailTask.scrap(listItem);
    detailTask.on('finish', function(detailItem) {
        // insert to database
        insertPostDbTask(detailItem);
    });
};

var insertPostDbTask = function(detailItem) {
    dbTask.insertPost(detailItem);
    dbTask.insertScrappedPost(detailItem);
};

main();