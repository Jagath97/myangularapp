var mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    user:String,
    product:String,
    totalprice:String,
    paymentmode:String,
    transactionid:String
})

const Order=mongoose.model('orders',orderSchema)
module.exports=Order