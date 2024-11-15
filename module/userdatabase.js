import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email :{
        type:String,
        requied: true,
        trim:true,
        unique:true,
        minlength:[3,'email must at least 3']


    },
    username:{
        type:String,
        requied: true,
        trim:true,
        minlength:[5,'username must at least 3']


    },
    password:{
        type:String,
        requied: true,
        trim:true,
        minlength:[3,'password must at least 3']


    },
})

export default mongoose.model('users',userSchema);