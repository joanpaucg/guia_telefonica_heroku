const mongoose=require("mongoose");
const mongoose_unique=require("mongoose-unique-validator")
const dotenv=require("dotenv")
dotenv.config()
const MONGODB_USER=process.env.MONGODB_USER
const MONGODB_PASSWORD=process.env.MONGODB_PASSWORD|| 'password'
const url= `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.eoc2x.mongodb.net/persons-app?retryWrites=true&w=majority`
console.log(url)
mongoose.connect(url)
.then(
    console.log("Connected to Mongo DB")
).catch(error=>console.log(error.message))
const Schema=mongoose.Schema;
const personSchema=new Schema({
    name:{type:String,unique:true,minlength:3},
    number:{type:Number,maxlength:8}
})

personSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
      returnedObject.id=returnedObject._id.toString()
      delete  returnedObject._id 
      delete  returnedObject.__v 
    }
})
personSchema.plugin(mongoose_unique)

module.exports=mongoose.model("Person",personSchema);