import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  constructor(private product:ProductsService) { }

  ngOnInit() {
  }
add(event){
  event.preventDefault()
  const target=event.target
  const name=target.querySelector('#name').value
    const url=target.querySelector('#url').value
    const price=target.querySelector('#price').value
    const regex=new RegExp('^[0-9]*$')
    if(!regex.test(price)){
      window.alert("Invalid Price! Valid number[0-9]")
    }
    else{
      this.product.addproducts(name,url,price).subscribe(res=>{
        if(res.result){
          window.alert(res.data)
        }
      })
    }
}
}
