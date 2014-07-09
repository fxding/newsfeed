var mongoose = require('mongoose');

// create news schema
var Schema = mongoose.Schema;
var NewsSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    date: {
        type:Date,
        default:Date.now
    }
});

// create news model
module.exports = exports = mongoose.model('News', NewsSchema);
