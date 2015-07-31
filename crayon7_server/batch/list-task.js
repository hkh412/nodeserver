/**
 * Created by hkh on 2015-02-03.
 */

/**
 * registered event list
 * @type {Array}
 */
var events = [];
var http = require('http');
var querystring = require('querystring');
var cheerio = require('cheerio');
var _ = require('underscore');
var $ = {};

var list = [];
var taskCnt = 0;

var QUERY_MENU_DELAY = 30 * 1000;
var QUERY_PAGE_DELAY = 30 * 1000;

var hostname = "http://www.114114.com";
var paths = [
    "/board.php?bo_mode=list&bo_table=job&city1=전국",
    "/board.php?bo_mode=list&bo_table=resume&city1=전국",
    "/board.php?bo_mode=list&bo_table=house&city1=전국",
    "/board.php?bo_mode=list&bo_table=sale&city1=전국",
    "/board.php?bo_mode=list&bo_table=car&city1=전국",
    "/board.php?bo_mode=list&bo_table=service&city1=전국",
];

module.exports = {
    scrap: function (n_pages) {
        taskCnt = paths.length * n_pages;
        // inner loop for all menus
        _.each(paths, function(path, index) {
            setTimeout(function(){
                for (var i=0; i<n_pages; i++){
                    setTimeout(function(page){
                        httpGetPage(path, page);
                    }, QUERY_PAGE_DELAY * i, i+1);
                }
            }, QUERY_MENU_DELAY * index);
        });

    },
    on: function(eventName, callback) {
        var event = {
            name: eventName,
            callback: callback
        };
        var matched = false;
        _.each(events, function(item) {
            if (item.name == eventName) {
                item.callback = callback;
                matched = true;
            }
        });
        if (!matched) {
            events.push(event);
        }
    },
    off: function(eventName) {
        events = _.reject(events, function(event){
            return event.name == eventName;
        });
        console.log(events);
    }
}

var httpGetPage = function(path, page) {
    var url = hostname+path+'&page='+page;
    console.log(url);
    var html = "";
    http.get(url, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            html += chunk;
        });
        res.on('end', function() {
            //console.log(html);
            $ = cheerio.load(html, {decodeEntities: false});
            var list = parseHtml($);
            callEvent('parse', list);

            taskCnt--;
            if (taskCnt == 0) {
                callEvent('finish');
            }
        });
    });
    // maybe sleep for some secs...
}

var parseHtml = function($) {
    // $ is for each document
    var $li_arr = $('ul.list-wrap li');
    var array = [];
    _.each($li_arr, function(li) {
        var item = {
            cate1: $(li).find('p.title em').text().trim(),
            title: $(li).find('p.title a').text().trim(),
            date: $(li).find('span.time').text().trim(),
            link: $(li).find('p.title a').attr('href')
        };
        try {
            item.postId = querystring.parse(item.link)["id"];
            // [^\s]+: any character except space one or more times
            // text: '(서울 마포구) - 생산.건설' -> '서울'
            var cities = /[^(][^)]+/.exec(item.cate1)[0].split(/\s(.+)/);
            item.city1 = cities[0];
            item.city2 = cities[1];
            item.cate1 = /[-][^]+/.exec(item.cate1)[0].toString().replace(/[-\s]+/, '');

            // 오피스텔/월세 -> 오피스텔 (/월세 제거)
            item.cate1 = item.cate1.toString().replace(/\/(.+)/, '');
            item.bbs_id = querystring.parse(item.link)['bo_table'];
            if (item.bbs_id == 'sale') {
                item.bbs_id = 'market';
            } else if (item.bbs_id == 'service') {
                item.bbs_id = 'adver';
            }

        } catch (err) {
            console.log('parse list item error: '+err);
        }
        if (item.postId && item.postId.length>0
            && item.date && item.date.length == 5
            && item.cate1 && item.city1 && item.city2) {
            array.push(item);
        } else {
            console.log('skip malformed post');
        }
    });
    return array;
};

var callEvent = function(eventName, data) {
    _.each(events, function(event) {
        if (event.name == eventName && event.callback) {
            event.callback(data);
        }
    });
};