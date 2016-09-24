var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({
        login: {
            type: String,
            require: true,
            index: {
                unique: true
            }
        },
        nome: {
            type: String,
            require: true
        },
        inclusao: {
            type: Date,
            default: Date.now
        }
    });
}