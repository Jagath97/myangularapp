import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface product{
  result:boolean,
  response:any,
  total:string
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  total:any
  constructor(private http:HttpClient) { }

  setProducts(id,name,price,quantity){
   return this.http.post<product>('/api/addtocart',{
      name,
      quantity,
      price
    })
  }
  totalcartproducts=""
  settotal(total:any){
    this.total=total
  }
  setcartproduct(product:any){
   this. totalcartproducts=""
    product.forEach( async element => {
          this.totalcartproducts+="Product:"+element.name +"\nQuantity:"+ element.quantity+"\nPrice:"+element.price+"\n\n"
        })
  }
  get getCartProducts(){
    return this.totalcartproducts
  }
  get getTotal(){
    return this.total
  }
  cartProducts(){
    return this.http.post<product>("/api/getcart",{})
  }
  clearcart(){
    return this.http.post<product>('/api/clearcart',{})
  }

}
