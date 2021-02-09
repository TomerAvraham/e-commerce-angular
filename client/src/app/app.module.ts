import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainViewComponent } from './views/main-view/main-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { ShopViewComponent } from './views/shop-view/shop-view.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainLoginComponent } from './components/main-login/main-login.component';
import { MainMiddleContentComponent } from './components/main-middle-content/main-middle-content.component';
import { MainAboutShopComponent } from './components/main-about-shop/main-about-shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    RegisterViewComponent,
    ShopViewComponent,
    MainLoginComponent,
    MainMiddleContentComponent,
    MainAboutShopComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatStepperModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
