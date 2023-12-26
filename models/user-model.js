const mongoose = require("mongoose");

const schema = mongoose.schema;

const userSchema =  new Schema({
    name:{
        type: String,
        required: true,
    },
    surname:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
    },
    issuedBook:{
        type: mongoose.Schema.Type.ObjectId,
        ref:"Book",
        required: false,
    },
    returnDate:{
        type: String,
        required: false,
    },
     subscriptionType:{
        type: String,
        required: true,
    },
     subscriptionDate:{
        type: String,
        required: true,
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);