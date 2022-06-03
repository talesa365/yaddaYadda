const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let ReferralProgram = new Schema(
    {
        recipient: {
            type: String
        },
        first_name: {
            type:String
        },
        last_name: {
            type: String
        },
        voucher_program: {
            type: String
        },
        contact_number: {
            type: Number
        },
        time_to_call: {
            type: Number
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
        collection: 'referralProgram'
    }
)
module.exports = mongoose.model('ReferralProgram', ReferralProgram);
