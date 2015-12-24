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

/**
 * 获取随机字符串
 * @param num 随机字符串的长度
 * @param type 如为"number"则返回数字，否则为大小写字母加数字
 * @returns {string}
 */
utility.getRandomString = function (num, type) {
    var table = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var str = '';
    var i, index;
    if (type == 'number') {
        for (i = 0; i < num; i++) {
            index = Math.floor(Math.random() * 10);
            str += table[index];
        }
    } else {
        for (i = 0; i < num; i++) {
            index = Math.floor(Math.random() * table.length);
            str += table[index];
        }
    }
    return str;
};

module.exports = utility;