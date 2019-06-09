import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../payment.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.css']
})
export class PaymentpageComponent implements OnInit {
  details:any
  finalresults=[]
  constructor(private router:Router,private http:HttpClient,private payment:PaymentService,private cart:CartService) { }

  ngOnInit() {
    this.details=this.payment.paymentDetails
    this.payment.setDetails(this.details.id,this.details.mode,this.details.total)
    this.payment.placeOrder().subscribe(data=>{
      if(data.result){
        this.finalresults.push(data.data);
        this.cart.clearcart().subscribe(res=>{
          this.cart.settotal("0")
        })
        console.log(this.finalresults)
      }
    })
  }

}
