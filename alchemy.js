"use strict";

var crypto = require('crypto');

var alg = 'des-cbc';
var key = new Buffer('804BD9D4');
var iv = new Buffer('804BD9D4');
var autoPad = true;

var alchemy = {};

alchemy.encrypt = function (plaintext) {
    var cipher = crypto.createCipheriv(alg, key, iv);
    cipher.setAutoPadding(autoPad);  // default is true
    var ciph = cipher.update(plaintext, 'utf8', 'hex');
    ciph += cipher.final('hex');
    ciph = ciph.toUpperCase();
    return ciph;
};

alchemy.decrypt = function (ciph) {
    var decipher = crypto.createDecipheriv(alg, key, iv);
    decipher.setAutoPadding(autoPad);
    var txt = decipher.update(ciph, 'hex', 'utf8');
    txt += decipher.final('utf8');
    return txt;
};

module.exports = alchemy;
