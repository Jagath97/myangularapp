import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  total:any
  data:any
  constructor(private cart:CartService,private payment:PaymentService,private router:Router) { }

  ngOnInit() {
    this.total=this.cart.getTotal
    console.log(this.cart.getTotal)
  }
  orderpayment(event){
    event.preventDefault()
    const target=event.target
    const cardnumber=target.querySelector('#cardnumber').value
    const name=target.querySelector('#name').value
    const expiry=target.querySelector('#expiry').value
    const cvv=target.querySelector('#cvv').value

    //console.log(cardnumber,name,expiry,cvv)

    const regex=new RegExp('^[0-9]*$')
    if(!regex.test(cardnumber)||(cardnumber.length!=16)){
      window.alert("Invalid Card Number! Valid number[0-9] length=16")
    }
    else if(!regex.test(cvv)||(cvv.length!=3)){
      window.alert("Invalid CVV! Valid number[0-9] length=3")
    }
    else{
      this.payment.getCardPayment(cardnumber,name,expiry,cvv,this.total).subscribe(res=>{
        if(res.result){
          this.data=res.data
          this.payment.setDetails(this.data._id,res.mode,this.data.total)
          this.router.navigate(['cart/payment'])
        }
      })
    }    
  }
}
