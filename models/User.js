const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    name:{
        type : String,
        required : true
    },
    accountNumber:{
        type : Number,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    balance:{
        type : Number,
        default : 10000
    },
    history:{
        type : Array,
        default : []
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;