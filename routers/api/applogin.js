var async = require('async');
var alchemy = require('../../alchemy');
var dbHelper = require('../../dbHelper');

function checkUsername(username, callback) {

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
};