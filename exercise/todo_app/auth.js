/**
 * Created by hkh on 2015-02-15.
 */

var crypto = require('crypto');

var shasum = crypto.createHash('sha1');
shasum.update('password');
var hash = shasum.digest('hex');

console.log(hash);