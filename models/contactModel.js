const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "please add the contact eamil address"],
    },

    phone: {
        type: Number,
        required: [true, "please add the contact phonenumber"],
    }
},

{
  timestamps: true
}
);

module.exports = mongoose.model("Contact",contactSchema)