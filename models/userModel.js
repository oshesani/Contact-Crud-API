const mongoose =  require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        unique:[true, "email adress already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add password"],
        
    },
       
    },
    {
        timestamps: true
})

module.exports = mongoose.model("user", userSchema)