/**
 * Created by hkh on 2015-07-31.
 */

var sqlAdminLog = require('../sql/sql_admin_log');
var _ = require('underscore');

/**
 * 글 입력 서비스
 * @param req
 * @param res
 */
exports.insert123UserLog = function(req, res, next) {

    req.getConnection(function(err, connection){
        if (err) return next(err);

        // get city1 id
        var data = {
            city: req.body.city,
            user_id: req.body.user_id,
            nicknm: req.body.nicknm,
            level: req.body.level,
            point: req.body.point,
            email: req.body.email
        };

        connection.query(sqlAdminLog.INSERT_123_USERLOG, data, function(err, results) {
            res.send(data);
        });
    });
};
