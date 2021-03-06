import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private Auth:AuthenticationService,private router:Router) { }

  ngOnInit() {
    this.Auth.logout().subscribe((data)=>{
      if(data.result){
        console.log(data)
        this.Auth.setLoginStatus(!data.result)
        this.Auth.setUserName("Guest")
        this.router.navigate([''])
      }
    })
  }
}
