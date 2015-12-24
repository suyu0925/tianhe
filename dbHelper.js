var MongoClient = require('mongodb').MongoClient;
var config = require('./config.json');

var dbHelper = {};

/**
 * 判断是否已经存在数据
 * @param collection
 * @param query
 * @param callback
 */
dbHelper.isExisted = function (collection, query, callback) {
    MongoClient.connect(config.dbUrl, function (err, db) {
        if (err) {
            callback(err);
            return;
        }

        db.collection(collection).find(query).count(function (err, count) {
            db.close();

            if (err) {
                callback(err);
                return;
            }

            if (count == 0) {
                callback(null, false);
            } else {
                callback(null, true);
            }
        });
    });
};

/**
 * 新增一条数据
 * @param collection
 * @param data
 * @param callback
 */
dbHelper.insertOne = function (collection, data, callback) {
    MongoClient.connect(config.dbUrl, function (err, db) {
        if (err) {
            callback(err);
            return;
        }

        db.collection(collection).insertOne(data, function (err, doc) {
            db.close();

            callback(err, doc);
        });
    });
};

/**
 * 找到第一个符合请求条件的数据
 * @param collection
 * @param query
 * @param callback
 */
dbHelper.findOne = function (collection, query, callback) {
    MongoClient.connect(config.dbUrl, function (err, db) {
        if (err) {
            callback(err);
            return;
        }

        db.collection(collection).find(query).next(function (err, doc) {
            db.close();

            callback(err, doc);
        });
    });
};

/**
 * 按条件修改一条数据
 * @param collection
 * @param query
 * @param operation
 * @param callback
 */
dbHelper.updateOne = function (collection, query, operation, callback) {
    MongoClient.connect(config.dbUrl, function (err, db) {
        if (err) {
            callback(err);
            return;
        }

        db.collection(collection).updateOne(query, operation, function (err, result) {
            db.close();

            callback(err, result);
        });
    });
};

module.exports = dbHelper;