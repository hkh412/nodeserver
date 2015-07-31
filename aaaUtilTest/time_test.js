/**
 * Created by hkh on 2015-02-26.
 */

var moment = require('moment');
var now = moment();
var b = moment([2015, 1, 22]);
//var c = moment('2015-02-22T15:26:08.000Z');
var c = moment();

console.log(b.fromNow());
console.log(now.diff(now, 'days'));

if (c.diff(now, 'days') > 0){
    console.log(c.format('YYYY-MM-DD'));
} else {
    // at least 1 days ago
    console.log(c.format('HH:mm:ss a'));
}
//console.log(now.diff(b), 'days');