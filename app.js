const { config } = require("dotenv")
const express =require ("express")
const app = express()
require("dotenv").config()
const sql=require("./services/db").sql
//For stringify
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
); 
//Connection to our dataBase
sql()


const referenceRoute=require("./controller/reference.controller")
app.use("/reference",referenceRoute)
app.get('/',(req,res)=>{
res.send(`<h1 style="color:Tomato;">Hello</h1><h2>by</h2>`)
})


const port =process.env.PORT||3000

app.listen(port,()=>{
    console.log("You are runniung at port ",port)
})



