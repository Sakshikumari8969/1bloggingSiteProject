const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const { loginAuthor, authorCreate } = require("../controllers/authorController")

// ### Authentication
// - Add an authorisation implementation for the JWT token that validates the token before every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code
// - Protected routes are create a blog, edit a blog, get the list of blogs, delete a blog(s)
// - Set the token, once validated, in the request - `x-api-key`
// - Use a middleware for authentication purpose.

const authentication=async function(req,res,next){
    try{
        let token=req.headers["x-api-key"]
    if(!token){
        res.status(401).send({msg:"no token exists"})
    }
    let decodedToken=jwt.verify(token,"projectum1",function(err,decodedToken){
        if(err){
            res.status(401).send({ msg: "token is not valid" })
        }else{
        next()
    }})
}catch(error){
    res.status(500).send({error:error.message})
}}

// ### Authorisation
// - Make sure that only the owner of the blogs is able to edit or delete the blog.
// - In case of unauthorized access return an appropirate error message.



const authorisation = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        let decodedToken = jwt.verify(token, "projectum1")
        if (decodedToken.authorId != req.params.authorId) {
            res.status(404).send({ msg: "not correct" })
        }else{
        next()
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}
    
   

module.exports.authentication=authentication;
module.exports.authorisation=authorisation;