import { Component, OnInit } from '@angular/core';
import{AuthenticationService} from '../authentication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth:AuthenticationService,private route:Router) { }

  ngOnInit() {

  }
  
  login(event){
    event.preventDefault()
    const target=event.target;
    const email=target.querySelector('#email').value
    const password=target.querySelector('#password').value
    //console.log(email,password)
    this.Auth.getUserDetais(email,password).subscribe((data)=>{
      if(data.result){
        console.log(data)
        this.Auth.setLoginStatus(true)
        this.Auth.setUserName(data.user)
        this.route.navigate([''])
      }
      else{
        console.log(data)
        window.alert("Invalid Credentials")
      }
    })
  }
}
