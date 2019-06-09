var mongoose=require('mongoose');
const cardSchema=new mongoose.Schema({
    user:String,
    card:String,
    name:String,
    expiry:String,
    cvv:String,
    total:String
})

const Card=mongoose.model('cardservice',cardSchema)
module.exports=Card