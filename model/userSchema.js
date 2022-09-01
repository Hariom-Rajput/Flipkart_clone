import mongoose from "mongoose";

const  userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
    }, 
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,            //  we'll search in DB using username so we are doing indexing here for super fast searching  
    },         
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        min: 10,
        max: 10,
        trim: true
    }
})

// mongoose.model('user', userSchema); --> it will cxreate a collection in mongoDB having name as 'user'
const user = mongoose.model('user', userSchema);

export default user;