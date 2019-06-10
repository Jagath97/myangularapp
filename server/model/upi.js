var mongoose=require('mongoose');
const upiSchema=new mongoose.Schema({
    user:String,
    upi:String,
    total:String
})

const Upi=mongoose.model('upiservice',upiSchema)
module.exports=Upi