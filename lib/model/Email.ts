import mongoose from "mongoose";

const emailschema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})



const emailmodel = mongoose.models.Email || mongoose.model('Email',emailschema);

export default emailmodel;