import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentService } from './payment.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceorderGuard implements CanActivate {
  constructor(private payment:PaymentService,private route:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.payment.id!=undefined){
        return true
      }else{
        this.route.navigate([''])
      }
  }
  
}
