const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let VolunteerDonation = new Schema(
    {
        name_organization:{
            type:String
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        type_of_help: { 
        type: String
        },
        help_explained:{
            type: String
        },
        reciept:{
            type: Boolean
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
     
    },{
        collection: 'volunteerDonation'
    }
)
module.exports = mongoose.model('VolunteerDonation', VolunteerDonation);
