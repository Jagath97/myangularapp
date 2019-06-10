import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private route:Router,private cart:CartService,private auth:AuthenticationService) { }
  price:string
  length:any
  product:any
  enable:boolean
  loginstatus:boolean
  method:string
  proceed:boolean
  totalcartproducts:string=''
  ngOnInit() {
      new Promise(()=>this.cart.cartProducts().subscribe(res=>{
        this.method="none"
        this.proceed=false
        if(res.result){
          this.product=res.response
          this.cart.setcartproduct(this.product)
          this.length=this.product.length
          if(this.length>0){
            this.enable=true
          }
          this.price="Rs."+res.total
          this.cart.settotal(res.total)
          console.log(this.cart.getTotal)
        }
         /*this.product.forEach( async element => {
          this.totalcartproducts+="Product:"+element.name +"\nQuantity:"+ element.quantity+"\nPrice:"+element.price+"\n"
          console.log(this.totalcartproducts)
          this.cart.setcartproduct(this.totalcartproducts)
        })*/
      }))

      
      
    }
  clear(){
    console.log("Clicked Clear")
    this.cart.clearcart().subscribe(res=>{
      if(res.result){
        this.route.navigate([''])
      }
    }) 
  }
  paymentmethod(event){
    event.preventDefault()
    this.method=event.target.value;
    if(this.method!="none"){
      this.proceed=true
    }
    else{
      this.proceed=false
    }
    console.log(this.method)
  }
  payment(){
    //const route=this.method
    this.route.navigate(['paymentsui'])
  }
  home(){
    this.route.navigate([''])
  }
  logout(){
    this.route.navigate(['logout'])
  }
}
