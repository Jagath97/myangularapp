import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-netbanking',
  templateUrl: './netbanking.component.html',
  styleUrls: ['./netbanking.component.css']
})
export class NetbankingComponent implements OnInit {

  constructor(private cart:CartService,private payment:PaymentService,private router:Router) { }
  total:any
  data:any
  banks=[{
    name:"--Select Bank--",
  },
  {
    name:"Andhra Bank",
  },
  {
    name:"Axis Bank",
  },
  {
    name:"Bank of India",
  },
  {
    name:"City Union Bank",
  },
  {
    name:"HDFC Bank",
  },
  {
    name:"Indian Bank",
  },
  {
    name:"Karnataka Bank",
  },
  {
    name:"State Bank of India",
  }
    
]
  ngOnInit() {
    this.total=this.cart.getTotal
    console.log(this.cart.getTotal)
  }
method:String
proceed:boolean=false
bank(event){
  event.preventDefault()
    this.method=event.target.value;
    if(this.method!="--Select Bank--"){
      this.proceed=true
    }
    else{
      this.proceed=false
    }
}
finalbank:String
orderpayment(event){
  this.finalbank=""
  event.preventDefault()
  const target=event.target
  const account=target.querySelector('#user').value
  const password=target.querySelector('#password').value
  this.payment.getNetBankingPayment(this.method,account,password,this.total).subscribe(res=>{
    if(res.result){
      this.data=res.data
      this.finalbank=res.mode +": "+this.method;
      this.payment.setDetails(this.data._id,this.finalbank,this.data.total)
      this.router.navigate(['cart/payment'])
    }
  })
}
}
