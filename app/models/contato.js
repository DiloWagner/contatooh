var mongoose = require('mongoose');

module.exports = function() {
    
    var schema = mongoose.schema({
        nome: {
            type: string,
            require: true
        },
        email: {
            type: string,
            require: true,
            index: {
                unique: true
            }
        }
    });

    return mongoose.model('Contato', schema);
}