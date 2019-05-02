//TODO: Limit the rating field to values 1-5
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var responseSchema = new Schema({
    body:   { type: String, required: true, default: "Thanks for your review\n" },
    date:   { type: Date, required: true, default: Date.now },
    id:     { type: Number, required: true },
    rating: { type: Number }
});

module.exports = mongoose.model('Response', responseSchema);
