// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }

const mongoose = require("mongoose");
const validator = require("validator");
// const {isValid}=require("../")

const authorSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        enum:["Mr","Mrs","Miss"],
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"not valid email"],
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
    
},{timestamps:true})

module.exports=mongoose.model("myAuthor",authorSchema);