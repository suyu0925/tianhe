var async = require('async');
var dbHelper = require('../../dbHelper');
var utility = require('../../utility');

var collectionName = 'user';

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
                callback();
            } else {
                callback(new Error('手机号没有注册'));
            }
        }
    });
}

/**
 * 获取手机短信验证码
 * @param data
 * @param callback
 */
module.exports = function (data, callback) {
    if (!data.phone) {
        callback(new Error('手机号为空'));
        return;
    }

    if (!data.type) {
        callback(new Error('验证类型为空'));
        return;
    } else {
        data.type = parseInt(data.type);
        if (isNaN(data.type)) {
            callback(new Error('验证类型应该为数字'));
            return;
        }

        if (data.type != 0 && data.type != 1) {
            callback(new Error('验证类型应该为0或1'));
            return;
        }
    }

    async.waterfall(
        [
            // 检查手机号
            function (callback) {
                if (data.type === 1) {
                    // 忘记密码的验证码要先检查手机号是否已经注册过
                    checkPhone(data.phone, function (err) {
                        callback(err);
                    });
                } else {
                    callback();
                }
            },
            // 返回结果
            function (callback) {
                var code = utility.getRandomString(6, 'number');
                callback(null, {
                    msg: '验证码获取成功',
                    verificationcode: code
                });
            }
        ],
        function (err, data) {
            callback(err, data);
        }
    );
};