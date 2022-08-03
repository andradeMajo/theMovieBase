const express= require ("express")
const app= express()
const main= require("./model/database")
const Users= require("./model/index")
console.log(Users);
main().then(()=> app.listen(3001, () => console.log(`running port http://localhost:3001/`)))



