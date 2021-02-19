import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { OrderGuard } from './guards/order.guard';
import { MainViewComponent } from './views/main-view/main-view.component';
import { OrderViewComponent } from './views/order-view/order-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { ShopViewComponent } from './views/shop-view/shop-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'shop', component: ShopViewComponent, canActivate: [AuthGuard] },
  {
    path: 'order',
    component: OrderViewComponent,
    canActivate: [AuthGuard, OrderGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
