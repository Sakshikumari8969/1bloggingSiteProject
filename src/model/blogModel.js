// { title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, category: {string, mandatory}, subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
// ```
const mongoose=require("mongoose")
// const moment=require("moment")
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    authorId:{
        type:String,
        ref:"myAuthor"
    },
    tags:{
        type:[String]
    },
    category:{
        type:String,
        require:true
    },
    subcategory:{
        type:[String]
    },
    deletedAt:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    publishedAt:{
        type:String
    },
    isPublished:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("myBlog",blogSchema)