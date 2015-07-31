/**
 * Created by hkh on 2015-02-11.
 */


var _depre_QUERY_POST_LIST =
    " SELECT A.id, title, B.name AS cate1, C.name AS cate2, D.name AS city1, E.name AS city2, A.ctdt AS date" +
    " FROM post AS A"+
    " LEFT JOIN cate1 AS B ON A.cate1_id = B.id"+
    " LEFT JOIN cate2 AS C ON A.cate2_id = C.id"+
    " LEFT JOIN city1 AS D ON A.city1_id = D.id"+
    " LEFT JOIN city2 AS E ON A.city2_id = E.id"+
    " WHERE A.bbs_id=? AND city1=? AND city2=? AND cate1=? AND A.del != 1";

exports.QUERY_POST_LIST =
    " SELECT id, title, cate1, city1, city2, ctdt AS date" +
    " FROM post"+
    " WHERE bbs_id=? AND del != 1";

exports.QUERY_POST_CNT =
    " SELECT COUNT(*) AS cnt" +
    " FROM post"+
    " WHERE bbs_id=? AND del != 1";

exports.QUERY_POST_DETAIL =
    " SELECT A.id, title, content, B.name AS cate1, C.name AS cate2, D.name AS city1, E.name AS city2, A.ctdt" +
    " FROM post AS A"+
    " LEFT JOIN cate1 AS B ON A.cate1_id = B.id"+
    " LEFT JOIN cate2 AS C ON A.cate2_id = C.id"+
    " LEFT JOIN city1 AS D ON A.city1_id = D.id"+
    " LEFT JOIN city2 AS E ON A.city2_id = E.id"+
    " WHERE A.id=?";

exports.INSERT_POST =
    "INSERT INTO post SET ?, del=0, ctdt=NOW(), updt=NOW()";

exports.UPDATE_POST =
    "UPDATE post SET ?, updt=NOW() WHERE id=?";

exports.DELETE_POST =
    "UPDATE post SET del=1, updt=NOW() WHERE id=?";

exports.QUERY_CITY_1 =
    "SELECT id, name FROM city1 WHERE name=?";

exports.QUERY_CITY_2 =
    "SELECT id, name FROM city2 WHERE name=?";

exports.QUERY_CATE_1 =
    "SELECT id, name FROM cate1 WHERE name=?";

exports.QUERY_CATE_2 =
    "SELECT id, name FROM cate2 WHERE name=?";


// city1, city2 list
exports.QUERY_CITY_1_LIST =
    "SELECT id, name FROM city1 ORDER BY display";

exports.QUERY_CITY_2_LIST =
    "SELECT id, name FROM city2 WHERE city1_id=?";

// cate1, cate2 list
exports.QUERY_CATE_1_LIST =
    "SELECT id, name FROM cate1 WHERE bbs_id=?";

exports.QUERY_CATE_2_LIST =
    "SELECT id, name FROM cate2 WHERE bbs_id=?";