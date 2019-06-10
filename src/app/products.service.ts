import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface product{
  id:string,
  name:string,
  url:string,
  price:string,
}
interface order{
  result:boolean,
  data:any
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.post<product>('/api/getproducts',{})
  }
  getuserorders(){
    return this.http.post<order>('/api/userorders',{})
  }
  addproducts(name,url,price){
    return this.http.post<order>('api/addproducts',{name,url,price})
  }
}
