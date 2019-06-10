import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';

interface orderpayment{
  result:boolean,
  mode:String,
  data:any
}
interface orderstatus{
  result:boolean,
  data:any
}
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  id:String
  mode:String
  total:String
  constructor(private http:HttpClient,private cart:CartService) { }

  getPaytm(account,password,total){
    return this.http.post<orderpayment>('api/payment/paytm',{account,password,total})
  }
  getPaypal(account,password,total){
    return this.http.post<orderpayment>('api/payment/paypal',{account,password,total})
  }
  setDetails(id:String,mode:String,total:String){
    this.id=id
    this.mode=mode
    this.total=total
  }
  get paymentDetails(){
    return {id:this.id, mode:this.mode,total:this.total}
  }
  getCardPayment(card,name,expiry,cvv,total){
    return this.http.post<orderpayment>('api/payment/card',{card,name,expiry,cvv,total})
  }
  getUpiPayment(upi,total){
    return this.http.post<orderpayment>('api/upi',{upi,total})
  }
  getNetBankingPayment(bank,account,password,total){
    return this.http.post<orderpayment>('api/netbanking',{bank,account,password,total})
  }
  placeOrder(){
    const transactionid=this.id
    const paymentmode=this.mode
    const totalprice=this.total
    const product=this.cart.getCartProducts
    return this.http.post<orderstatus>('api/completeorder',{product,transactionid,paymentmode,totalprice})
  }
}
