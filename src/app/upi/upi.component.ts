import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upi',
  templateUrl: './upi.component.html',
  styleUrls: ['./upi.component.css']
})
export class UpiComponent implements OnInit {

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
    const upi=target.querySelector('#upi').value
    this.payment.getUpiPayment(upi,this.total).subscribe(res=>{
      if(res.result){
        this.data=res.data
        this.payment.setDetails(this.data._id,res.mode,this.data.total)
        this.router.navigate(['cart/payment'])
      }
    })
  }
}
