var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var alchemy = require('../../alchemy');
var config = require('../../config');

/**
 * 检查用户是否已经存在
 * @param db
 * @param username
 * @param callback
 */
function checkUsername(db, username, callback) {
    db.collection('cwp').find({
        username: username
    }).count(function (err, count) {
        if (err) {
            callback(new Error('数据库连接失败'));
        } else {
            if (count != 0) {
                callback(new Error('用户已存在'));
            } else {
                callback();
            }
        }
    });
}

module.exports = function (data, callback) {
    if (!data.username) {
        callback(new Error('用户名为空'));
        return;
    } else {
        try {
            //data.username = alchemy.decrypt(data.username);
        } catch (e) {
            callback(new Error('用户名解析错误'));
            return;
        }
    }

    if (!data.phone) {
        callback(new Error('手机号为空'));
        return;
    }

    if (!data.password) {
        callback(new Error('密码为空'));
        return;
    } else {
        try {
            //data.password = alchemy.decrypt(data.password);
        } catch (e) {
            callback(new Error('密码解析错误'));
            return;
        }
    }

    MongoClient.connect(config.dbUrl, function (err, db) {
        if (err) {
            callback(new Error('数据库连接失败'));
            return;
        }

        async.waterfall(
            [
                // 检查用户名
                function (callback) {
                    checkUsername(db, data.username, function (err) {
                        callback(err);
                    });
                },
                // 检查手机号
                function (callback) {
                    callback(null, {msg: '注册成功'});
                }
            ],
            function (err, data) {
                db.close();
                callback(err, data);
            }
        );
    });
};