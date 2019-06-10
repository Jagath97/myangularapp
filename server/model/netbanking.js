var mongoose=require('mongoose');
const netSchema=new mongoose.Schema({
        user:String,
        bank:String,
        account:String,
        password:String,
        total:String
    
})

const Net=mongoose.model('netbanking',netSchema)

module.exports=Net