import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentui',
  templateUrl: './paymentui.component.html',
  styleUrls: ['./paymentui.component.css']
})
export class PaymentuiComponent implements OnInit {

  constructor(private cart:CartService,private payment:PaymentService,private router:Router) { }
  total:any
  data:any
  ngOnInit() {
    this.total=this.cart.getTotal
    //console.log(this.cart.getTotal)
  }
  paytm:boolean=false
  paypal:boolean=false
  card:boolean=false
  upi:boolean=false
  net:boolean=false
  value(v){
  this.paytm=false
  this.paypal=false
  this.card=false
  this.upi=false
  this.net=false
  if(v=='paytm')
    this.paytm=true
  if(v=='paypal')
    this.paypal=true
  if(v=='card')
    this.card=true
  if(v=='upi')
    this.upi=true
  if(v=='net')
    this.net=true
}
    
  }

