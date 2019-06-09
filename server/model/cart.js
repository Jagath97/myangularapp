var mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({
    user:String,
    name:String,
    quantity:String,
    price:String
})

const Cart=mongoose.model('cart',cartSchema)

module.exports=Cart