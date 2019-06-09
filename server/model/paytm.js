var mongoose=require('mongoose');
const paytmSchema=new mongoose.Schema({
    user:String,
    account:String,
    password:String,
    total:String
})

const Paytm=mongoose.model('paytmservice',paytmSchema)
module.exports=Paytm