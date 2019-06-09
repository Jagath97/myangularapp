import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paytm',
  templateUrl: './paytm.component.html',
  styleUrls: ['./paytm.component.css']
})
export class PaytmComponent implements OnInit {

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
    const account=target.querySelector('#phone').value.toString()
    const password=target.querySelector('#password').value
    if(account.length==10){
      console.log(account.length)
      this.payment.getPaytm(account,password,this.total).subscribe(res=>{
      if(res.result){
        this.data=res.data
        this.payment.setDetails(this.data._id,res.mode,this.data.total)
        this.router.navigate(['cart/payment'])
      }
    })
    }
    else{
      window.alert("Phone is not valid")
    }
    
  }

}
