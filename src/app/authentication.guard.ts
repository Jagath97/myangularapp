import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './authentication.service'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements  CanActivate{
  constructor(private auth:AuthenticationService,private router:Router){}
  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
      return this.auth.check().pipe(map(res=>{
        this.auth.setLoginStatus(res.result)
        this.auth.setUserName(res.user)
        if(res.result)
        this.router.navigate([''])
        else
        return !res.result
      }))
    }
  
}
