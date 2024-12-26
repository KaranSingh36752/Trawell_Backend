const moongose = require('mongoose');
const user = require('./user');

const groupSchema = new mongoose.Schema(
    {
        groupName : {
            type : String,
            required : true,
            minLength : 4,
            maxLength : 20,
        },
        groupDescription : {
            type : String,
            required : true,
        },
        groupAdmin: {
            type : moongose.Schema.Types.ObjectId,
            ref : 'User',
            required : true,
        },
        groupMembers :[
            {
                user : {
                    type : moongose.Schema.Types.ObjectId,
                    ref : 'User',
                },
                isVerified : {
                    type : Boolean,
                    default : false,
                }
            }
        ],
        destination: {
            type: [String],
            required: true,
        },
        travelDate:{
            type: Date,
            required: true,
        },
        isOpen:{
            type:Boolean,
            default : true,
        }
        
}
);

module.exports = moongose.model("Group" , groupSchema);