var async = require('async');
var alchemy = require('../../alchemy');
var dbHelper = require('../../dbHelper');

var collectionName = 'user';

/**
 * 判断是否存在此用户
 * @param username
 * @param callback
 */
function checkUsername(username, callback) {
    dbHelper.isExisted('cwp', {username: username}, function (err, existed) {
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

    dbHelper.findOne(collectionName, {username: data.username}, function (err, doc) {
        if (err) {
            callback(new Error('数据库连接失败'));
            return;
        }

        if (!doc) {
            callback(new Error('没有找到此用户，请先注册'));
            return;
        }

        if (doc.password != data.password) {
            callback(new Error('密码错误'));
            return;
        }

        callback(null, {
            username: doc.username,
            type: doc.type
        });
    });
};