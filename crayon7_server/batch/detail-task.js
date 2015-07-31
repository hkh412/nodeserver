/**
 * Created by hkh on 2015-02-03.
 */
var events = [];
var http = require('http');
var querystring = require('querystring');
var cheerio = require('cheerio');
var _ = require('underscore');
var $ = {};

var hostname = "www.114114.com";

var options = {
    hostname: hostname,
    method: 'GET',
    headers: {
        'Cookie': 'cid=llft1422085238; cid_md5=3f4f0f1b7b579748430b79a16ee9a9fe; ' +
                  '114_city=%EC%A0%84%EA%B5%AD; 114webcheckcookie=no;'
    }
};

module.exports = {
    scrap: function(item){
        options.path = '/'+item.link;
        var results = '';
        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                results = results + chunk;
            });
            res.on('end', function () {
                $ = cheerio.load(results, {decodeEntities: false});
                item.content = parseHtml($);

                // success callback
                _.each(events, function(event) {
                    if (event.name == 'finish' && event.callback) {
                        event.callback(item);
                    }
                });
            });
        });
        req.on('error', function(e) {
            console.log(e);
        });
        req.end();
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
};

var parseHtml = function($) {
    var content = $('.article-detail .content').text();
    content.replace('114114에서 보았다고 말씀하세요.', '');
    return content;
};