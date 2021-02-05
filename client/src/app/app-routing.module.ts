import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './views/main-view/main-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'register', component: RegisterViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
