const mongoose=require('mongoose')
const articleSchema=new mongoose.Schema({
   // _id:new  mongoose.Types.ObjectId(),

  
    title:{
        type: String,
        required:true
    },
    categories: {
      type: String,
      required:true
    },
    description:{
        type: String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('Article',articleSchema)