var utility = {};

utility.jsonOk = function (res, msg, data) {
    if (data === undefined) {
        data = {};
    }
    data.code = 400;
    data.msg = msg;
    res.json(data);
};

utility.jsonError = function (res, msg) {
    res.json({
        code: 200,
        msg: msg
    });
};

module.exports = utility;