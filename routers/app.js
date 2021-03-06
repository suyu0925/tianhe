var router = require('express').Router();
var utility = require('../utility');
var api = require('./api/api.js');

/**
 * 承运商（司机）注册
 */
router.get('/appregistercwp.app', function (req, res) {
    var userName = req.query.userName;
    var mobilePhone = req.query.mobilePhone;
    var pwd = req.query.pwd;
    api.registercwp({
        username: userName,
        phone: mobilePhone,
        password: pwd,
        type: 'carrier'
    }, function (err, data) {
        if (err) {
            utility.jsonError(res, err.message);
        } else {
            var msg = data.msg;
            delete data.msg;
            utility.jsonOk(res, msg, data);
        }
    });
});

/**
 * 货主注册
 */
router.get('/appregisterewp.app', function (req, res) {
    var userName = req.query.userName;
    var mobilePhone = req.query.mobilePhone;
    var pwd = req.query.pwd;
    api.registerewp({
        username: userName,
        phone: mobilePhone,
        password: pwd,
        type: 'shipper'
    }, function (err, data) {
        if (err) {
            utility.jsonError(res, err.message);
        } else {
            var msg = data.msg;
            delete data.msg;
            utility.jsonOk(res, msg, data);
        }
    });
});

/**
 * 登录
 */
router.get('/applogin.app', function (req, res) {
    var userName = req.query.userName;
    var pwd = req.query.pwd;
    api.login({
        username: userName,
        password: pwd
    }, function (err, data) {
        if (err) {
            utility.jsonError(res, err.message);
        } else {
            var msg = data.msg;
            delete data.msg;
            utility.jsonOk(res, msg, data);
        }
    });
});

/**
 * 获取短信验证码
 */
router.get('/appphoneverification.app', function (req, res) {
    var phone = req.query.mobilePhone;
    var type = req.query.businessType;
    api.phoneverification({
        phone: phone,
        type: type
    }, function (err, data) {
        if (err) {
            utility.jsonError(res, err.message);
        } else {
            var msg = data.msg;
            delete data.msg;
            utility.jsonOk(res, msg, data);
        }
    });
});

/**
 * 更改密码
 */
router.get('/appupass.app', function (req, res) {
    var password = req.query.npwd;
    var phone = req.query.mobilePhone;
    api.upass({
        phone: phone,
        password: password
    }, function (err, data) {
        if (err) {
            utility.jsonError(res, err.message);
        } else {
            var msg = data.msg;
            delete data.msg;
            utility.jsonOk(res, msg, data);
        }
    });
});

module.exports = router;
