var mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    _id:String,
    name:String,
    url:String,
    price:String
})

const Product=mongoose.model('Products',productSchema)

module.exports=Product