var alchemy = require('../../alchemy');
var dbHelper = require('../../dbHelper');
var async = require('async');

var collectionName = 'user';

/**
 * 检查手机号是否已经被注册过
 * @param phone {string}
 * @param callback {function(err, data)}
 */
function checkPhone(phone, callback) {
    dbHelper.isExisted(collectionName, {phone: phone}, function (err, existed) {
        if (err) {
            callback(new Error('数据库连接失败'));
        } else {
            if (existed) {
                callback();
            } else {
                callback(new Error('手机号未注册'));
            }
        }
    });
}

/**
 * 更改密码
 * @param data
 * data.phone {string}
 * data.password {string} 加密数据
 * @param callback
 */
module.exports = function (data, callback) {
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
            // 检查手机号是否已经注册
            function (callback) {
                checkPhone(data.phone, function (err) {
                    callback(err);
                });
            },
            // 更新密码
            function (callback) {
                dbHelper.updateOne(collectionName, {
                    phone: data.phone
                }, {
                    $set: {
                        password: data.password
                    }
                }, function (err, result) {
                    if (err) {
                        callback(new Error('数据库操作错误'));
                    } else {
                        callback();
                    }
                });
            },
            // 返回结果
            function (callback) {
                callback(null, {msg: '修改成功'});
            }
        ],
        function (err, data) {
            callback(err, data);
        }
    );
};