const express= require ("express")
const app= express()
const routes= require ("./routes")
require("dotenv").config()

const main= require("./model/database")
const Users= require("./model/User")
const Movies=require("./model/Movies")
const bodyParser = require('body-parser')

app.use(express.json())
app.use("/api",routes);
main().then(()=> app.listen(3001, () => console.log(`running port http://localhost:3001/`))).catch((error)=>console.error("Unable to connect:", error))



