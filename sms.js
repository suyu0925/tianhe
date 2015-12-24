var request = require('request');
var urlencode = require('urlencode');

var sms = {};

var account = 'cf_tianheplatform';
var password = 'KWA4ZX';
var smsUrl = 'http://106.ihuyi.cn/webservice/sms.php?method=Submit';

var template = {
    register: '您好！欢迎您的注册，短信验证码为：【veriable】。该验证码60分钟内有效，若超时，请重新获取。',
    upass: '您的验证码是：【veriable】，请不要把验证码泄露给其他人。如非本人操作，可不用理会 ！'
};

sms._send = function (options, callback) {
    var phone = options.phone;
    var content = options.content;
    var url = smsUrl + '&account=' + account + '&password=' + password + '&mobile=' + phone + '&content=' + content;
    request(url, function (err, res, body) {
        callback(err, body);
    });
};

sms.send = function (options, callback) {
    if (!callback) {
        callback = function () {
        };
    }

    if (!options.type) {
        callback(new Error('短信类型为空'));
        return;
    }

    if (!options.phone) {
        callback(new Error('手机号为空'));
        return;
    }

    if (!options.content) {
        callback(new Error('短信内容为空'));
        return;
    }

    var content = template[options.type];
    if (!content) {
        callback(new Error('没有找到短信模板'));
        return;
    }

    options.content = urlencode(content.replace('veriable', options.content));
    sms._send(options, callback);
};

module.exports = sms;
