import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ItemAmountPopup } from './components/shop-item/shop-item.component';
import { ShopNavbarComponent } from './components/shop-navbar/shop-navbar.component';
import { ShopItemListComponent } from './components/shop-item-list/shop-item-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { OrderViewComponent } from './views/order-view/order-view.component';
import { OrderItemListComponent } from './components/order-item-list/order-item-list.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { HighlightDirective } from './directives/highlight.directive';
import { OrderPopupComponent } from './components/order-popup/order-popup.component';
import { MatTableModule } from '@angular/material/table';
import { AdminEditPanelComponent } from './components/admin-edit-panel/admin-edit-panel.component';

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
    ShopCartComponent,
    ShopItemComponent,
    ShopNavbarComponent,
    ShopItemListComponent,
    ItemAmountPopup,
    OrderViewComponent,
    OrderItemListComponent,
    OrderItemComponent,
    OrderFormComponent,
    HighlightDirective,
    OrderPopupComponent,
    AdminEditPanelComponent,
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
    MatSidenavModule,
    MatTabsModule,
    FlexLayoutModule,
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
  providers: [
    AuthService,
    CartService,
    ProductService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
