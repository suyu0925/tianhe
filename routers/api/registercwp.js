var async = require('async');
var alchemy = require('../../alchemy');
var dbHelper = require('../../dbHelper');

var collectionName = 'user';

/**
 * 检查用户是否已经存在
 * @param username
 * @param callback
 */
function checkUsername(username, callback) {
    dbHelper.isExisted(collectionName, {username: username}, function (err, existed) {
        if (err) {
            callback(new Error('数据库连接失败'));
        } else {
            if (existed) {
                callback(new Error('用户已存在'));
            } else {
                callback();
            }
        }
    });
}

/**
 * 检查手机号是否已经被注册过
 * @param phone
 * @param callback
 */
function checkPhone(phone, callback) {
    dbHelper.isExisted(collectionName, {phone: phone}, function (err, existed) {
        if (err) {
            callback(new Error('数据库连接失败'));
        } else {
            if (existed) {
                callback(new Error('手机号已被注册'));
            } else {
                callback();
            }
        }
    });
}

/**
 * 注册新用户
 * @param data
 * @param callback
 */
function createAccount(data, callback) {
    dbHelper.insertOne(collectionName, data, function (err, doc) {
        callback(err);
    });
}

/**
 * 注册用户
 * @param data
 * data.username
 * data.phone
 * data.password
 * @param callback
 */
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

    async.waterfall(
        [
            // 检查用户名
            function (callback) {
                checkUsername(data.username, function (err) {
                    callback(err);
                });
            },
            // 检查手机号
            function (callback) {
                checkPhone(data.phone, function (err) {
                    callback(err);
                });
            },
            // 添加新用户
            function (callback) {
                createAccount(data, function (err) {
                    callback(err);
                });
            },
            // 返回结果
            function (callback) {
                callback(null, {msg: '注册成功'});
            }
        ],
        function (err, data) {
            callback(err, data);
        }
    );
};