var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);
//  schema
var reviewtSchema = new Schema({

    reviewId: {
        type: Number,
        required: true,
        unique: true
    },
    reviewerName: {
        type: String,
        unique:false,
        trim: true
    },
    reviewTitle: {
        type: String,
        unique:false,
        trim: true
    },
    reviewComment: {
        type: String,
        unique:false,
        trim: true
    },
    reviewRate: {
        type: Number,
        min: 1,
        max: 5,
        required: false,
        unique:false
    },
    reviewContact:{
        type: String,
        required: false,
        unique: false
    },
    reviewDate:{
        type: Date,
        default: Date.now(),
        required: true
    },
    responseToReview: {
        type: Number,
        default: null,
        required: false,
        unique: false
    }
});
// return the model
module.exports = mongoose.model('Reviews', reviewtSchema);