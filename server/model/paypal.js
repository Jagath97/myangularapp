var mongoose=require('mongoose');
const paypalSchema=new mongoose.Schema({
    user:String,
    account:String,
    password:String,
    total:String
})

const Paypal=mongoose.model('paypalservice',paypalSchema)
module.exports=Paypal