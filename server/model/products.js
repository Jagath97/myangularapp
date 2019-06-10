var mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:String,
    url:String,
    price:String
})

const Product=mongoose.model('Products',productSchema)

module.exports=Product