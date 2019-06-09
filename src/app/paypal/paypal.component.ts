import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  
  constructor(private cart:CartService,private payment:PaymentService,private router:Router) { }
  total:any
  data:any
  ngOnInit() {
    this.total=this.cart.getTotal
    console.log(this.cart.getTotal)
  }
  orderpayment(event){
    event.preventDefault()
    const target=event.target
    const account=target.querySelector('#email').value.toString()
    const password=target.querySelector('#password').value
      this.payment.getPaypal(account,password,this.total).subscribe(res=>{
      if(res.result){
        this.data=res.data
        this.payment.setDetails(this.data._id,res.mode,this.data.total)
        this.router.navigate(['cart/payment'])
      }
    })
    
    
    
  }


}
