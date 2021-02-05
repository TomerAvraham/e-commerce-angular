import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainViewComponent } from './views/main-view/main-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { ShopViewComponent } from './views/shop-view/shop-view.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainLoginComponent } from './components/main-login/main-login.component';
import { MainMiddleContentComponent } from './components/main-middle-content/main-middle-content.component';
import { MainAboutShopComponent } from './components/main-about-shop/main-about-shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    RegisterViewComponent,
    ShopViewComponent,
    MainLoginComponent,
    MainMiddleContentComponent,
    MainAboutShopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
