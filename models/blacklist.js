const mongo = require('mongoose')
const Schema = new mongo.Schema({
    userid: String,
    reason: [String],
    preuve: [String],

});

module.exports = mongo.model('blacklist', Schema);