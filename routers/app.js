var router = require('express').Router();
var utility = require('../utility');
var api = require('./api/api.js');

// 承运商（司机）注册
router.get('/appregistercwp.app', function (req, res) {
    var userName = req.query.userName;
    var mobilePhone = req.query.mobilePhone;
    var pwd = req.query.pwd;
    api.registercwp({
        username: userName,
        phone: mobilePhone,
        password: pwd
    }, function(err, data){
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
