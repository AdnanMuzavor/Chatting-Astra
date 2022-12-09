
const mongoose= require("mongoose");

//METHOD-I
const DB=process.env.MONGO_URI;
// console.log(process.env.MONGO_URI);
mongoose.connect(DB,{
    useNewUrlParser:true,
  
    useUnifiedTopology:true,
   
 } )
.then(()=>{
    console.log("Connection with mo mongodb done")
})
.catch((e)=>{
    console.log(e);
})

//METHOD-II


// const connection=async()=>{
//     try {
//         const conn= mongoose.connect(process.env.MONGO_URI,{
//             useNewUrlParser:true,
//             useUnifiedTopology:true,
//         })
//         console.log(`MongoDB connected: ${conn}`)
//     } catch (e) {
//         console.log(e);
//     }
// }

//module.exports=connection;