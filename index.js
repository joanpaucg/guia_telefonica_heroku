const express=require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person=require("./src/models/person")
const mongoose=require("mongoose")
morgan.token("reqBody",(req=>JSON.stringify(req.body)))
const app=express()
const PORT=process.env.PORT || 3001
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))
app.use(cors())
app.use(express.static('build'))
app.get("/api",(request,response)=>{
    response.send("<h1>Welcome to Persons API my friend</h1>")
})
app.get("/api/persons",(request,response)=>{
    Person.find({}).then(
        (persons)=>{
            response.json(persons);
            //mongoose.connection.close()
        }
    )
        
    
    //response.json(persons)
})

app.post("/api/persons",(request,response,next)=>{
    const {name,number}=request.body
    const newPerson={
        "name":name,
        "number":number
    }
    if(!name || !number){
        return response.status(400).json({"error":"name or number is missing"})
    }

    /*const existingName=persons.find(person=>person.name===name)
    if(existingName) return response.status(400).json({error:"Name must be unique"})*/
    //persons=[...persons,newPerson]
    Person.create(newPerson)
    .then(person=>{
        console.log(person)
        response.json(person)
        //mongoose.connection.close()

    }).catch(error=>next(error))
    

})
app.get("/api/persons/:id",(request,response,next)=>{
    Person.findOne({_id:request.params.id})
    .then(person=>{
        if(person)
        response.json(person)
        else{
            response.status(404).end()
        }

    }).catch(error=>next(error))
    
})
app.put("/api/persons/:id",(request,response,next)=>{
    Person.findOneAndUpdate({_id:request.params.id},{"$set":request.body},{"new":true})
    .then(updatedPerson=>response.json(updatedPerson))
    .catch(error=>next(error))
})
app.delete("/api/persons/:id",(request,response,next)=>{
    Person.findOneAndRemove({_id:request.params.id})
    .then(()=>response.status(204).end())
    .catch(error=>next(error))
})

app.get("/info",(request,response)=>{
    response.send("<p>Phonebook has info for <strong>"+persons.length+"</strong> people</p> <p> "+new Date().toUTCString()+" </p> ")
})



const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ message: 'malformatted id' })
    } 
    else if(error.name==="ValidationError"){
        return response.status(400).send({ message: error.message })
    }
  
    next(error)
  }
app.use(errorHandler) 


app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})