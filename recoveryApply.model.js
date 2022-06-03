const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let RecoveryApply = new Schema(
    {
        recipient: {
            type: String
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        date: {
            type:String
        },
        household_size: {
            type: String
        },
        num_adult: {
            type: Number
        },
        num_child: {
            type: Number
        },
        f_conviction: {
            type: String
        },
        f_explanation: {
            type: String
        },
        userId:{
            type: String
        },
        created_at:{
            type:Number
        },
        case_notes:{
            type: String
        }

    }, {
        collection: 'recoveryApply'
    }
)
module.exports = mongoose.model('RecoveryApply', RecoveryApply);
