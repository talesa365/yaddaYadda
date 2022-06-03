const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Admin = new Schema(
    {
        admin_id: { 
        type: String
        },
        admin_password:{
            type: String
        },
        case_notes:{
            type:String
        },
        case_notes:{
            type: String
        }
     
    },{
        collection: 'Admin'
    }
)
module.exports = mongoose.model('Admin', Admin);
