import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  constructor(private product:ProductsService,private route:Router) { }
  orders=[]
  show:boolean=false
  ngOnInit() {
    this.product.getuserorders().subscribe(response=>{
      if(response.result){
        if(response.data.length>0){
          this.show=true
        }
        response.data.forEach(element => {
          this.orders.push(element)
        });
        this.orders=this.orders.reverse()
        //console.log(response.result)
        //console.log(response.data.length)
      }
    })
  }
  logout(){
    this.route.navigate(['logout'])
  }

}
