const mongoose=require('mongoose');

async function Database(){
    await mongoose.connect(`${process.env.MONGOOSE_SERVER}`)
    .then(()=>console.log('connection established'))
    .catch((error)=>console.log(error))
}
module.exports=Database