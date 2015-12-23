var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var alchemy = require('../alchemy');
var config = require('../config');

// 承运商（司机）注册
router.get('/appregistercwp.app', function (req, res) {
    var userName = req.query.userName;
    var mobilePhone = req.query.mobilePhone;
    var pwd = req.query.pwd;

    if (!userName) {
        res.json({
            code: 200,
            msg: '用户名不得为空'
        });
        return;
    } else {
        userName = alchemy.decrypt(userName);
    }

    if (!mobilePhone) {
        res.json({
            code: 200,
            msg: '手机号不得为空'
        });
        return;
    }

    if (!pwd) {
        res.json({
            code: 200,
            msg: '密码不得为空'
        });
        return;
    } else {
        pwd = alchemy.decrypt(pwd);
    }

    MongoClient.connect(config.dbUrl, function (err, db) {
        if (err) {
            res.json({
                code: 200,
                msg: '数据库连接失败'
            });
        } else {
            db.collection('cwp').find({
                $or: {
                    userName: userName,
                    mobilePhone: mobilePhone
                }
            }).toArray(function (err, docs) {
                db.close();
                if (err) {
                    res.json({
                        code: 200,
                        msg: '数据库连接失败'
                    });
                } else {
                    res.json({
                        code: 400,
                        msg: '申请注册成功'
                    });
                }
            });
        }
    });
});

module.exports = router;
