const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const Product=require('./model/products')
const User=require('./model/users')
const Order=require('./model/order')
const Cart=require('./model/cart')
const app=express()
const session=require('express-session')

app.use(bodyParser.json())
app.use(session({
    secret:"yraifancahfahiefhaix1123jdjai",
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:2592000}
}))
mongoose.Promise=Promise    
mongoose.connect("mongodb://localhost:27017/myproducts",{useNewUrlParser:true}).then(()=>console.log("Mongoose Connected!"));


/*
const p1=new Product({
    _id:"two",name:"Nokia",url:"new_url",price:"50000"
})
p1.save().then(()=>console.log("added a collection"))
*/
app.post('/api/login',async (req,res)=>{
    console.log(req.body)
    const {email,password}=req.body
    const result=await User.findOne({email,password})
    if(!result){
    console.log("Invalid Credentials")
    res.json({
        result:false
    })
    }
    else{
        console.log("Logging You In "+ result.name)
        req.session.user=result.name;
        res.json({
            result:true,
            user:req.session.user
        }
        )
    }
})

app.post('/api/completeorder',async (req,res)=>{
    const user=req.session.user
    const {product,transactionid,paymentmode,totalprice}=req.body
    const neworder=new Order({
        user,
        product,
        transactionid,
        paymentmode,
        totalprice
    })
    console.log(product,transactionid,paymentmode,totalprice)
    await neworder.save().then(data=>{
        res.json({
            result:true,
            data:data
        })
    })
})


app.post('/api/order',async (req,res)=>{
    const products=req.body
    var total=0
    for(i in products){
    total+=parseInt(products[i].price,10)*parseInt(products[i].quantity,10)
    }
    res.json({
        products:products,
        result:total.toString()
    })
})
const Paytm=require('./model/paytm')
app.post('/api/payment/paytm',async (req,res)=>{
    const user=req.session.user
    const {account,password,total}=req.body;
    const newpayment=new Paytm({
        user,
        account,
        password,
        total
    })
    await newpayment.save().then((data)=>{
        if(data){
            res.json({
                result:true,
                mode:"Paytm",
                data:data
            })
        }
    })
})

app.post('/api/userorders',async (req,res)=>{
    const user=req.session.user
    await Order.find({user}).then(response=>{
        res.json({
            result:true,
            data:response
        })
    })
})

const Paypal=require('./model/paypal')
app.post('/api/payment/paypal',async (req,res)=>{
    const user=req.session.user
    const {account,password,total}=req.body;
    const newpayment=new Paypal({
        user,
        account,
        password,
        total
    })
    await newpayment.save().then((data)=>{
        if(data){
            res.json({
                result:true,
                mode:"Paypal",
                data:data
            })
        }
    })
})

const Card=require('./model/card')
app.post('/api/payment/card',async (req,res)=>{
    const user=req.session.user
    const {card,name,expiry,cvv,total}=req.body
    const newpayment=new Card({
        user,
        card,
        name,
        expiry,
        cvv,
        total
    })
    await newpayment.save().then((data)=>{
        if(data){
            res.json({
                result:true,
                mode:"Card",
                data:data
            })
        }
    })
})

app.get('/api/isuser',(req,res)=>{
    res.json({
        result:!!req.session.user,
        user:req.session.user
    })
})
app.post('/api/clearcart',async(req,res)=>{
    const user=req.session.user
    await Cart.deleteMany({user}).then(()=>{
        res.json({
            result:true
        })
    })
})
app.post('/api/logout',async (req,res)=>{
    if(req.session.destroy()){
        console.log("Logged Out!")
    res.json({
        result:true
    })
}
})

app.post('/api/addtocart',async (req,res)=>{
    const user=req.session.user
    const {name,quantity,price}=req.body
    const newitem=new Cart({
        user,
        name,
        quantity,
        price
    })
    await newitem.save().then(()=>{
        res.json({
            result:true
        })
    })
})

app.post('/api/getcart',async(req,res)=>{
    const user=req.session.user
    const result=await Cart.find({user})
    total=0
    if(result){
        console.log(result.length)
        for (i in result) {
            total+=parseInt(result[i].price,10)*parseInt(result[i].quantity,10)
        }
        res.json({result:true,response:result,total:total.toString()})
    }
    else{
        res.json({result:false})
    }
})

app.post('/api/register',async (req,res)=>{
    const {name,email,password}=req.body
    const result=await User.findOne({email})
    if(!result){
    const newuser=new User({
        name,
        email,
        password
    })
    await newuser.save().then(()=>{
        console.log("New User Added")
        req.session.user=name
        res.json({
            result:true,
            user:req.session.user
        })
    });
    }
    else{
        console.log("Email Already Registered!")
        res.json({
            result:false
        })
    }
})
app.post('/api/getproducts',async (req,res)=>{
    const result=await Product.find({});
    if(!result)
    console.log("Error In getting Products!")
    else{
    //console.log(JSON.stringify(result))
    res.end(JSON.stringify(result))    
    }
})
app.listen(8080,()=>console.log("Server listening on PORT:8080"))