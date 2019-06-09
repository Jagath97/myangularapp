import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HttpClientModule} from '@angular/common/http'
import {AuthenticationGuard }from './authentication.guard'
import { AuthenticationService } from './authentication.service';
import { SignoutComponent } from './signout/signout.component';
import {UserGuard} from './user.guard';
import { CartComponent } from './cart/cart.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component'
import { ProductsService } from './products.service';
import { CartGuard } from './cart.guard';
import { PaytmComponent } from './paytm/paytm.component';
import { CartService } from './cart.service';
import { PaymentGuard } from './payment.guard';
import { PaymentService } from './payment.service';
import { PlaceorderGuard } from './placeorder.guard';
import { CardComponent } from './card/card.component';
import { PaypalComponent } from './paypal/paypal.component';
import { AllordersComponent } from './allorders/allorders.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SignoutComponent,
    CartComponent,
    PaymentpageComponent,
    PaytmComponent,
    CardComponent,
    PaypalComponent,
    AllordersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
    {
        path:'signup',
        component:SignupComponent,
        canActivate:[AuthenticationGuard]
    },
    {
        path:'login',
        component:LoginComponent,
        canActivate:[AuthenticationGuard]
    },
    {
      path:'logout',
      component:SignoutComponent
    },
    {
      path:'cart',
      component:CartComponent,
      canActivate:[CartGuard]
    },
    {
      path:'orders',
      component:AllordersComponent,
      canActivate:[CartGuard]
    },
    {
      path:'paytm',
      component:PaytmComponent,
      canActivate:[PaymentGuard]
    },
    {
      path:'cart/payment',
      component:PaymentpageComponent,
      canActivate:[PlaceorderGuard]
    },
    {path:'card',
    component:CardComponent,
    canActivate:[PaymentGuard]
    },
    {
      path:'paypal',
      component:PaypalComponent,
      canActivate:[PaymentGuard]
    },
    {
      path:'',
      component:HomeComponent,
      canActivate:[UserGuard]
    }
  
  ])
  ],
  providers: [PaymentService,AuthenticationService,AuthenticationGuard,PlaceorderGuard,UserGuard,ProductsService,CartService,CartGuard,PaymentGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
