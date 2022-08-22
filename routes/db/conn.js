// 连接数据库模块 npm i mysql -S
const mysql = require('mysql');
// 数据库信息
const conn = mysql.createPool({
    port: 3306, //数据库端口
    host: 'localhost', //数据库ip
    user: 'root', //数据库账号名
    password: 'admin123', //密码
    database: 'blog' //要连接的数据库名字
});
var query = function(sql, callback) {
    conn.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, null, function(err, results, fields) {
                //事件驱动回调
                callback(err, results, fields);
            });
            // 释放连接，需要注意的是连接释放需要在此释放，而不是在查询回调里面释放
            conn.release();
        }
    })
};
module.exports = { query };