import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }
  signup(event){
    event.preventDefault()
    const target=event.target;
    const name=target.querySelector('#name').value
    const email=target.querySelector('#email').value
    const password=target.querySelector('#password').value
    const cpassword=target.querySelector('#confirmpassword').value
    if(password!=cpassword){
      window.alert("Passwords do not match!")
    }
    else{
      this.auth.registerUser(name,email,password).subscribe((data)=>{
        if(data.result){
          this.auth.setLoginStatus(data.result)
          this.auth.setUserName(data.user)
          this.router.navigate([''])
        }
        else{
          window.alert("Email Already Registered!")
        }
      })
    }
  }
}
