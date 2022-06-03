const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let QuickApply = new Schema(
    {
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        quick_resource: { 
        type: String
        },
        quick_apply_number: { 
            type: Number
            },
        quick_adult:{
            type: Number
        },
       quick_child:{
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

    },{
        collection: 'quickApply'
    }
)
module.exports = mongoose.model('quickApply', QuickApply);
