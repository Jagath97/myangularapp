import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';

interface product{
  id:string,
  name:string,
  url:string,
  price:string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private Auth:AuthenticationService,private route:Router,private products:ProductsService,private cart:CartService) { }

  loginstatus=false
  loginbutton
  user
  allProducts:product
  ngOnInit() {
    //console.log("Init Called")
    this.loginstatus=this.Auth.isLoggedIn;
    this.user=this.Auth.userName;
    if(this.loginstatus){
      this.loginbutton="Logout"
      console.log(this.loginstatus)
    }
    else{
      this.loginbutton="Login"
    }
    var promise=this.products.getAllProducts().subscribe(data=>{
      if(data){
        this.allProducts=data;
        console.log("Products are ")
        console.log(this.allProducts)
      }
    })
  }

  gotocart(){
    this.route.navigate(['cart'])
  }
  gotoorders(){
    this.route.navigate(['orders'])
  }
  login(){
    if(this.loginbutton=="Login"){
      this.route.navigate(['login'])
    }
    else if(this.loginbutton=="Logout"){
   this.route.navigate(['logout'])
    }
  }
  
  buyProduct(event){
    event.preventDefault()
    console.log(event)
    if(this.loginstatus){
    const target=event.target
    const productname=target.querySelector('#productname').innerHTML
    const productprice=target.querySelector('#productprice').innerHTML
    const productid=target.querySelector('#productid').innerHTML
    const productquantity=target.querySelector('#productquantity').value
    console.log(this.user,productname,productprice,productquantity)
    //this.cart.setProducts(productid,productname,productprice,productquantity)
    //console.log(this.cart.cartProduct)
    this.cart.setProducts(productid,productname,productprice,productquantity).subscribe(res=>{
      if(res.result){
        //window.alert("Product Added to Cart!")
        this.route.navigate(['cart'])
      }
    })
    //this.route.navigate(['cart'])
    }
    else{
      this.route.navigate(['login'])
    }
    
  }


}
