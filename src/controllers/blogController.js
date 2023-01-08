const mongoose=require("mongoose")
const blogModel=require("../model/blogModel")
const authorModel=require("../model/authorModel")
const moment=require("moment")
// const { findByIdAndUpdate } = require("../model/blogModel")


// ### POST /blogs
// - Create a blog document from request body. Get authorId in request body only.
// - Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
// - Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like [this](#successful-response-structure) 
// - Create atleast 5 blogs for each author

// - Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)


const blogCreate=async function(req,res){
   try{
    let data=req.body;
    let authorId=req.body.authorId
    
    if(!data.title) return res.status(400).send({msg:"title is required"})
    if(!data.body) return res.status(400).send("body is required")
    if(!data.tags) return  res.status(400).send("tags is required")
    if(!data.category) return  res.status(400).send("category is required")
    if(!data.subcategory) return  res.status(400).send("subcategory is required")
    if(!data.authorId) return  res.status(400).send("authorId does not exist")
    // let author=await authorModel.findById(authorId)
    // if(!author){
    //     res.status(403).send({msg:"author does not exist"})
    // }else{
    let savedData=await blogModel.create(data)
    res.status(201).send({msg:savedData})
   }catch(error){
    res.status(500).send({error:error.message})
   }
}

// GET /blogs
// - Returns all blogs in the collection that aren't deleted and are published
// - Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure) 
// - If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 
// - Filter blogs list by applying filters. Query param can have any combination of below filters.
//   - By author Id
//   - By category
//   - List of blogs that have a specific tag
//   - List of blogs that have a specific subcategory
// example of a query url: blogs?filtername=filtervalue&f2=fv2


const getBlog=async function(req,res){
  try{
    let data=req.query;
    const{authorId,category,tag,subcategory}=data;
    if(data.title) return res.status(404).send({msg:"plz. put something valid"})
    if(data.body) return res.status(404).send({msg:"body is not acceptable"})
    let savedData=await blogModel.find({$and:[{isDeleted:false,isPublished:true},data]}).populate('authorId')
    if(savedData.length==0){
        res.status(404).send({msg:"error-response-structure"})
    }else{
        res.status(200).send({response:"successful-response-structure",msg:savedData})
    }
}catch(error){
    res.status(500).send({error:error.message})
}}

// ### PUT /blogs/:blogId
// - Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// - Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// - Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
// - Return an HTTP status 200 if updated successfully with a body like [this](#successful-response-structure) 
// - Also make sure in the response you return the updated blog document. 

const updateBlog=async function(req,res){
    try{
        let data=req.body;
    let blogId=req.params.blogId;
    const {title,body,tags,subcategory}=data;
    let time=moment().format()
    if(data.category) return res.status(400).send({msg:"you cannot update category"})
    let savedData=await blogModel.findByIdAndUpdate({_id:blogId},{$set:{title:title,body:body,isPublished:true,publishedAt:time},$push:{tags:tags,subcategory:subcategory}},{new:true})
    if(savedData){
        res.status(200).send({msg:savedData})
    }else{
        res.status(404).send({msg:"not allowed"})
    }
}catch(error){
    res.status(500).send({error:error.message})
}
}

// ### DELETE /blogs/:blogId
// - Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// - If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure) 

const deleteBlog=async function(req,res){
   try{
    let blogId=req.params.blogId
    let removeData=await blogModel.findByIdAndUpdate({_id:blogId,isDeleted:false},{$set:{isDeleted:true}},{new:true})
    if(!removeData){
        res.status(404).send({msg:"error-response-structure"})
    }else{
    res.status(200).send({status:true})
}}catch(error){
    res.status(500).send({error:error.message})
}}

// ### DELETE /blogs?queryParams
// - Delete blog documents by category, authorid, tag name, subcategory name, unpublishedcd
// - If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure)

const deleteBlog2=async function(req,res){
   try{
    let data=req.query
    let time=moment().format()                                                     //format('h:mm:ss')
    const{category,authorId,tags,subcategory,isPublished}=data
    // if(tags.length==0) return res.status(400).send({msg:"not allowed"})
    let blogDelete=await blogModel.findOneAndUpdate({data,isPublished:false},{$set:{isDeleted:true,deletedAt:time}},{new:true})
    if(blogDelete){
        res.status(200).send({msg:blogDelete})
    }else{
        res.status(404).send({msg:"error-response-structure"})
    }
}catch(error){
    res.status(500).send({error:error.message})
}}



module.exports.blogCreate=blogCreate;
module.exports.getBlog=getBlog;
module.exports.updateBlog=updateBlog;
module.exports.deleteBlog=deleteBlog;
module.exports.deleteBlog2=deleteBlog2;