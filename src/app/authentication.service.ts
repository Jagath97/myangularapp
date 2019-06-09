import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


interface user{
  result:boolean,
  user:string
}

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {


  constructor(private http:HttpClient) { }

  private loginstatus=false;
  private user="Guest"

  setLoginStatus(value:boolean){
    this.loginstatus=value
  }

  setUserName(value:string)
  {
    this.user=value;
  }
  get isLoggedIn(){
    return this.loginstatus
  }
  get userName(){
    return this.user
  }

  getUserDetais(email,password){
    return this.http.post<user>('/api/login',{
      email,
      password
    })
  }

  registerUser(name,email,password){
    return this.http.post<user>('/api/register',{
      name,
      email,
      password
    })
  }

  check():Observable<user>{
    return this.http.get<user>('/api/isuser')
  }

  logout(){
    return this.http.post<user>('/api/logout',{})
  }
}
