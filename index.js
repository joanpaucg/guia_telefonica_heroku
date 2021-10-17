const express=require("express")
const morgan = require("morgan")
const cors = require("cors")
morgan.token("reqBody",(req=>JSON.stringify(req.body)))
const app=express()

const PORT=process.env.PORT || 3001
const baseUrl="/"
function generateRandomNumber() {
    return Math.floor(Math.random() * 999999999);
  }
var persons = [
    {
      id: 1,
      name:"Arto Hellas",
      number:"040-123456"
      
    },
    {
      id: 2,
      name:"Ada Lovelace",
      number:"39-44-5323523"
    },
    {
      id: 3,
      name:"Dan Abramov",
      number:"12-43-234345"
    },
    {
        id: 4,
        name:"Mary Poppendick",
        number:"39-23-6423122"
      }
  ]
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))
app.use(cors())
app.get("/api",(request,response)=>{
    response.send("<h1>Welcome to Persons API my friend</h1>")
})
app.get("/api/persons",(request,response)=>{
    response.json(persons)
})

app.post("/api/persons",(request,response)=>{
    const {name,number}=request.body
    const newPerson={
        "id":generateRandomNumber(),
        "name":name,
        "number":number
    }
    if(!name || !number){
        return response.status(400).json({"error":"name or number is missing"})
    }
    const existingName=persons.find(person=>person.name===name)
    if(existingName) return response.status(400).json({error:"Name must be unique"})
    persons=[...persons,newPerson]
    response.json(newPerson)

})
app.get("/api/persons/:id",(request,response)=>{
    const id= Number(request.params.id)
    console.log(id)
    const person= persons.find(p=>p.id===id)
    person ? response.json(person) : response.status(404).end() 
    
})
app.put("/api/persons/:id",(request,response)=>{
    const id= Number(request.params.id)
    const body=request.body
    const newPerson={...body,id}
    console.log(newPerson)
    const person=persons.find(p => p.id === id)
    if(!person) return(response.status(404).end())
    persons=persons.map(p=> p.id !== id ? p : newPerson)
    response.json(newPerson)
})
app.delete("/api/persons/:id",(request,response)=>{
    const id= Number(request.params.id)
    persons=persons.filter(p=>p.id!==id)
    //console.log(persons)
    response.status(204).end()
})

app.get("/info",(request,response)=>{
    response.send("<p>Phonebook has info for "+persons.length+" people</p> <p> "+new Date().toUTCString()+" </p> ")
})


app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})