const mongoose = require("mongoose")
const  brcypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true
    }
})


// creating static sign up method
userSchema.statics.signup = async function(email,password){
    //validation
    if(!email || !password){
        throw Error("all fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Email is not valid")

    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")

    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email already in use")

    }

    //hashing the password
    const salt = await brcypt.genSalt(10)
    const hash = await brcypt.hash(password, salt)

    // saving the user

    const user  = await this.create({email, password: hash})
    return user
}

module.exports = mongoose.model("User", userSchema)