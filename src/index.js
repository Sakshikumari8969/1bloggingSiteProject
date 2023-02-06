const express=require("express");
const bodyParser=require("body-parser");
const route=require("./routes/route");
const{default:mongoose}=require("mongoose");
const { urlencoded } = require("express");
const app=express();
mongoose.set('strictQuery', true)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://Sakshi:monday123@cluster0.z5dpz2x.mongodb.net/myProject-1",
{useNewUrlParser:true}).then( ()=> console.log("MongoDb is ready")).catch(err=>console.log(err))

app.use("/",route)

app.listen(process.env.PORT || 3000, function(){
    console.log('Express app running on port'+(process.env.PORT ||3000))
});