const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const dotenv=require("dotenv")
dotenv.config()
const MONGODB_USER=process.env.MONGODB_USER
const MONGODB_PASSWORD=process.env.MONGODB_PASSWORD|| 'password'

const url= `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.eoc2x.mongodb.net/persons-app?retryWrites=true&w=majority`
console.log(url)
mongoose.connect(url).then(
    console.log("Connected to Mongo DB")
)
const personSchema=new Schema({
    name:{type:String},
    number:{type:Number}
}


)
const Person=mongoose.model("Person",personSchema);
const person= new Person({name:"MrRobbot",number:1010101010})
/*person.save().then(()=>{
    mongoose.connection.close()
    console.log("person saved ")
}
    
).catch(err=>console.log(err))*/
/*Person.find({})
.then(response=>{console.log(response)
    mongoose.connection.close()
})
.catch(err=>console.log(err))
//mongoose.connection.close()*/