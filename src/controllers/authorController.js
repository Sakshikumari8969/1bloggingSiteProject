const authorModel = require("../model/authorModel")
const jwt=require("jsonwebtoken")

// Author APIs /authors
// - Create an author - atleast 5 authors
// - Create a author document from request body.
//   `Endpoint: BASE_URL/authors`


const authorCreate = async function (req,res) {
    try {
        let data = req.body
        if(!data.fname) return res.status(400).send({msg:"firstName is required"})
        if(data.fname.match(/[0-9]/)) return res.status(400).send({msg:"first name cannot be a number"})
        if(!data.lname) return res.status(400).send({msg:"last name is required"})
        if(data.lname.match(/[0-9]/)) return res.status(400).send({msg:"last name cannot be a number"})
        if(!data.title) return res.status(400).send({msg:"title is required"})
        if(!(["Mr","Mrs","Miss"].includes(data.title))) return  res.status(400).send({msg:"you can use this three only:Mr,Mrs,Miss"})
        if(!data.email) return res.status(400).send({msg:"email is required"})
        if(!(data.email.match(/.+\@.+\..+/))) return res.status(400).send({msg:"plz. put valid email"})
        if(!data.password) return res.status(400).send({msg:"password is required"})
        if(!(data.password.match(/(?=.{8,})/))) return res.status(400).send({error: "password should have at least 8 characters" })
        if(!(data.password.match(/.*[a-zA-Z]/))) return res.status(400).send({error: "Plz include alphabets in password" })
        if(!(data.password.match(/.*\d/))) return res.status(400).send({error: "Password must contain digits" })
        let savedData = await authorModel.create(data)
        res.status(201).send({status: true, msg:savedData})     
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

// POST /login
// - Allow an author to login with their email and password. On a successful login attempt return a JWT token contatining the authorId in response body like [this](#Successful-login-Response-structure)
// - If the credentials are incorrect return a suitable error message with a valid HTTP status code

const loginAuthor=async function(req,res){
   try{let email=req.body.email
    let password=req.body.password
    if(!email) return res.status(404).send({msg:"emailId is required"})
    if(!password) return res.status(404).send({msg:"password is required"})
    let login=await authorModel.findOne({email:email,password:password})
    if(!login){
        res.status(404).send({msg:"user email and password is not registered"})
    }else{
        let token=jwt.sign({authorId:login.id},"projectum1")
        res.status(201).send({status:true,msg:token})
    }
}catch(error){
    res.status(500).send({error:error.message})
}}



module.exports.authorCreate = authorCreate;
module.exports.loginAuthor=loginAuthor;