import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FarmerComponent } from './main/content/farmer/farmer.component';
import { BuyerComponent } from './main/content/buyer/buyer.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NavFarmerComponent } from './main/navbar/nav-farmer/nav-farmer.component';
import { NavBuyerComponent } from './main/navbar/nav-buyer/nav-buyer.component';
import { FarmerItemsManageComponent } from './main/content/farmer/farmer-items-manage/farmer-items-manage.component';
import { FarmerItemsViewComponent } from './main/content/farmer/farmer-items-view/farmer-items-view.component';
import { BuyerItemsViewComponent } from './main/content/buyer/buyer-items-view/buyer-items-view.component';
import { BuyerCartComponent } from './main/content/buyer/buyer-cart/buyer-cart.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import {DecimalPipe} from "@angular/common";
import { ChatComponent } from './main/content/chat/chat.component';
import { OAuthModule } from 'angular-oauth2-oidc';
@NgModule({
  declarations: [
    AppComponent,
    FarmerComponent,
    BuyerComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    NavFarmerComponent,
    NavBuyerComponent,
    FarmerItemsManageComponent,
    FarmerItemsViewComponent,
    BuyerItemsViewComponent,
    BuyerCartComponent,
    PaymentSuccessComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot()
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
