const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test')
}
main().then(()=>{
 console.log("database connected");
}).catch(err => console.log(err));




module.exports=main